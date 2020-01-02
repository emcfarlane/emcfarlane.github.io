package main

import (
	"flag"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"log"
	"mime"
	"net"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	blackfriday "gopkg.in/russross/blackfriday.v2"
)

var (
	addr = flag.String("addr", "0.0.0.0:8080", "Server address")
)

type generator struct {
	//tmpl *template.Template
}

func (g generator) createTemplates() (*template.Template, error) {
	return template.ParseGlob("*.tmpl")
}

type item struct {
	Title       string
	Description string
	Src, Dst    string
	ModeTime    time.Time
}

type index struct {
	Title string
	Posts []item
}

type post struct {
	Markdown template.HTML
}

func (g *generator) listPostfiles() ([]string, error) {
	return filepath.Glob("posts/*.md")
}

type httpError struct {
	msg  string
	code int
}

func (e httpError) Error() string { return fmt.Sprintf("%s %d", e.msg, e.code) }

func (g *generator) genIndex() (*os.File, error) {
	const target = "index.html"

	postfiles, err := g.listPostfiles()
	if err != nil {
		return nil, err
	}

	var posts []item
	for _, p := range postfiles {
		fi, err := os.Stat(p)
		if err != nil {
			return nil, err
		}

		posts = append(posts, item{
			Title:    p,
			Src:      p,
			Dst:      strings.Replace(p, ".md", ".html", 1),
			ModeTime: fi.ModTime(),
		})
	}

	index := index{
		Title: "Blog Edward McFarlane",
		Posts: posts,
	}

	f, err := os.Create(target)
	if err != nil {
		return nil, err
	}

	tmpls, err := g.createTemplates()
	if err != nil {
		return nil, err
	}

	if err := tmpls.ExecuteTemplate(f, "index.tmpl", index); err != nil {
		return nil, err
	}

	fmt.Println("wrote", f.Name())
	//return os.Open(name)
	if _, err := f.Seek(0, io.SeekStart); err != nil {
		return nil, err
	}
	return f, nil

}

func (g *generator) genMD(src, dst string) (*os.File, error) {
	fmt.Printf("%s -> %s\n", src, dst)

	input, err := ioutil.ReadFile(src)
	if err != nil {
		return nil, err
	}

	output := blackfriday.Run(input)

	f, err := os.Create(dst)
	if err != nil {
		return nil, err
	}

	post := post{
		Markdown: template.HTML(output),
	}

	tmpls, err := g.createTemplates()
	if err != nil {
		return nil, err
	}

	if err := tmpls.ExecuteTemplate(f, "post.tmpl", post); err != nil {
		return nil, err
	}

	if _, err := f.Seek(0, io.SeekStart); err != nil {
		return nil, err
	}
	return f, nil
}

func (g *generator) mux(name string) (*os.File, error) {
	switch {
	case name == "", name == "/", name == "/index.html":
		return g.genIndex()

	case filepath.Ext(name) == ".html":
		dst := filepath.Join("./", path.Clean("/"+name))
		src := dst[:len(dst)-len(".html")] + ".md"
		return g.genMD(src, dst)

	default:
		dst := filepath.Join("./", path.Clean("/"+name))
		return os.Open(dst)
	}
}

// Open implements http.Fileserver
//func (g *generator) Open(name string) (http.File, error) {
func (g *generator) serveHTTP(w http.ResponseWriter, r *http.Request) error {
	name := r.URL.Path

	f, err := g.mux(name)
	if err != nil {
		return err
	}
	defer f.Close()

	w.Header().Set("Content-Type", mime.TypeByExtension(filepath.Ext(f.Name())))
	if _, err := io.Copy(w, f); err != nil {
		return err
	}
	return nil
}

func (g *generator) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	upath := r.URL.Path
	if !strings.HasPrefix(upath, "/") {
		upath = "/" + upath
		r.URL.Path = upath
	}

	log.Printf("%s %s\n", r.Method, upath)
	if err := g.serveHTTP(w, r); err != nil {
		var (
			msg  string
			code int
		)

		switch v := err.(type) {
		case httpError:
			msg, code = v.msg, v.code
		default:
			msg, code = fmt.Sprintf("internal server error: %s", err), http.StatusInternalServerError
		}
		http.Error(w, msg, code)
		log.Println(err)
		return
	}
}

func run() error {
	//mux := http.NewServeMux()
	addr := *addr
	hdlr := &generator{}

	//mux.Handle("/",

	l, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}

	log.Printf("serving %s", addr)
	return http.Serve(l, hdlr)
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
