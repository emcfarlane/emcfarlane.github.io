(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{91:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(7),i=(n(0),n(95)),o={slug:"sqlitex",title:"SQLite Search"},s={permalink:"/sqlitex",editUrl:"https://github.com/emcfarlane/emcfarlane.github.io/edit/master/blog/2021-08-01-sqlite.md",source:"@site/blog/2021-08-01-sqlite.md",description:"For many projects FTS is now a requirement.",date:"2021-08-01T00:00:00.000Z",tags:[],title:"SQLite Search",readingTime:3.565,truncated:!0,nextItem:{title:"A Web App Framework",permalink:"/webapps"}},l=[{value:"Data",id:"data",children:[]},{value:"Building the index",id:"building-the-index",children:[]},{value:"Running Serverless",id:"running-serverless",children:[]},{value:"Going Smaller",id:"going-smaller",children:[]},{value:"Alternatives",id:"alternatives",children:[]}],c={toc:l};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"For many projects FTS is now a requirement.\nSQLite's ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.sqlite.org/fts5.html"}),"fts5 extension")," provides full-text search (fts) functionality that's simple and fast.\nHere I document a solution for serverless applications that can run SQLite indexes in memory for fts."),Object(i.b)("h2",{id:"data"},"Data"),Object(i.b)("p",null,"My data is books. A 20 byte ID, a title, an array of authors and the publish year ~ 50-100 bytes per book.\nData size per item is a very important optimisation as it will determine the minimum size of your indexes.\nThe smaller the better."),Object(i.b)("h2",{id:"building-the-index"},"Building the index"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sql"}),"CREATE VIRTUAL TABLE IF NOT EXISTS books_search USING fts5(\n  id, title, authors, year,\n);\n")),Object(i.b)("p",null,"Queries can now be run returning the book ID's title and their ranking:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sql"}),"SELECT id, title, rank FROM books_search\nWHERE id, title MATCH $title\nORDER BY rank LIMIT 10;\n")),Object(i.b)("p",null,"150K books can be stored in a changeset file of around 22 MB."),Object(i.b)("h2",{id:"running-serverless"},"Running Serverless"),Object(i.b)("p",null,"The usual way to use these indexes would be to store the data on disk and have\nSQLite query the disk directly.\nGoing to serverless we lose the option for disk IO and have to use the cloud provided storage solutions.\nWe can therefore run the SQLite index in-memory, fetching the data when the table is needed."),Object(i.b)("p",null,"In my case I'm running a go application under google cloud run.\nHere I store the changesets under google's cloud storage and apply them as a changeset."),Object(i.b)("p",null,"The library I used for go is ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://pkg.go.dev/crawshaw.io/sqlite"}),"crawshaw.io/sqlite"),",\nwhich importantly supports sqlite's session extensions.\nBelow is a snippet on how to apply the sqlite index to an in memory database:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-go"}),'filterFn := func(tn string) bool {\n  return true\n}\nconflictFn := func(ct sqlite.ConflictType, ci sqlite.ChangesetIter) sqlite.ConflictAction {\n  return sqlite.SQLITE_CHANGESET_ABORT\n}\n\nblob, err := bkt.NewReader(ctx, name, nil)\nif err != nil {\n  return err\n}\ndefer blob.Close()\n\nvar r io.Reader\nr = blob\nif strings.HasSuffix(name, ".gz") {\n  gr, err := gzip.NewReader(r)\n  if err != nil {\n    return err\n  }\n  defer gr.Close()\n  r = gr\n}\n\nif err := c.ChangesetApply(r, filterFn, conflictFn); err != nil {\n  return err\n}\n')),Object(i.b)("p",null,"We can then apply the changeset when a search query is run.\nThe first query will be slow, downloading the index and applying it.\nBut subsequent queries will run very quickly on the in memory indexes."),Object(i.b)("h2",{id:"going-smaller"},"Going Smaller"),Object(i.b)("p",null,"The above worked great on a small dataset of around 150K books at 22 MB.\nHowever, going to a million books upped the index size to 192 MB.\nA bit on the heavy side for cloud run's RAM usuage.\nTo get a reasonable larger dataset we can compress, or more accurately throw away, more of the data.\nSQLite ",Object(i.b)("inlineCode",{parentName:"p"},"fts5")," tables have a ",Object(i.b)("inlineCode",{parentName:"p"},"content")," option. This allows you to specify the backing table for the search index.\nSetting ",Object(i.b)("inlineCode",{parentName:"p"},"content=''")," creates a contentless table, the columns won't be available under SQLite."),Object(i.b)("p",null,"Importantly for contentless fts tables we now need to set the ",Object(i.b)("inlineCode",{parentName:"p"},"rowid")," on inserts.\nWe must have an explicit ",Object(i.b)("inlineCode",{parentName:"p"},"rowid INTEGER PRIMARY KEY"),".\nThis is to avoid SQLite VACUUM rearrange the rowids and corrupting what the search index data points to."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sql"}),"CREATE TABLE IF NOT EXISTS books_index (\n  rowid INTEGER PRIMARY KEY,\n  bookid TEXT\n);\nCREATE INDEX idx_books_index ON books_index (bookid);\nCREATE VIRTUAL TABLE IF NOT EXISTS books_search USING fts5(\n  title, authors, year, content=''\n);\n")),Object(i.b)("p",null,"Queries can now be run returning the book ID's and their ranking:"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sql"}),"SELECT bookid, rank FROM books_search S\nJOIN books_index I ON S.rowid = I.rowid\nWHERE title MATCH $title\nORDER BY rank LIMIT 10;\n")),Object(i.b)("p",null,"Content isn't available via the index so all information must be fetchable based\non the ",Object(i.b)("inlineCode",{parentName:"p"},"bookid"),"."),Object(i.b)("p",null,"1 Million books can now be stored in 91 MB.\nGoing further we can compress the index on disk with gzip for a 47 MB gzipped file."),Object(i.b)("h2",{id:"alternatives"},"Alternatives"),Object(i.b)("p",null,"Alternatively serverless solutions like ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.algolia.com/"}),"Algolia")," are great and allow serverless applications to remain stateless without worrying about the implementation.\nSQLite also has some interesting solutions on running it client side. This is done by compiling SQLite to wasm and dynamically fetching parts of the database from storage when queries are run (",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/"}),"write up"),").\nFor small and simple application running the SQLite index as part of the application was exciting to see how easy it is to get a simple workable solution."))}b.isMDXComponent=!0},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),b=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=b(n),d=r,h=u["".concat(o,".").concat(d)]||u[d]||p[d]||i;return n?a.a.createElement(h,s(s({ref:t},c),{},{components:n})):a.a.createElement(h,s({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);