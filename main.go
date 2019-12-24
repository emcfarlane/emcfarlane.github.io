package main

import (
	"flag"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
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
	Title string
}

type index struct {
	Posts []item
}

func (g *generator) listPostfiles() ([]string, error) {
	return filepath.Glob("posts/*.md")
}

// Open implements http.Fileserver
//func (g *generator) Open(name string) (http.File, error) {
func (g *generator) serveHTTP(w http.ResponseWriter, r *http.Request) error {
	name := r.URL.Path
	fmt.Println("NAME", name)

	var target string
	switch name {
	case "/", "/index.html":
		target = "index.html"
	default:
		fmt.Println("NOT EXIST")
		return os.ErrNotExist
	}
	fmt.Println("HERE", target)

	tmpls, err := g.createTemplates()
	if err != nil {
		return err
	}

	postfiles, err := g.listPostfiles()
	if err != nil {
		return err
	}

	var posts []item
	for _, p := range postfiles {
		posts = append(posts, item{
			Title: p,
		})
	}

	index := index{
		Posts: posts,
	}

	f, err := os.Create(target)
	if err != nil {
		return err
	}
	defer f.Close()

	if err := tmpls.ExecuteTemplate(f, "index.tmpl", index); err != nil {
		return err
	}

	fmt.Println("wrote", f.Name())
	//return os.Open(name)
	if _, err := f.Seek(0, io.SeekStart); err != nil {
		return err
	}
	//f.Close()
	//return os.Open(target)
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
	if err := g.serveHTTP(w, r); err != nil {
		var (
			msg  string
			code int
		)

		switch {
		case os.IsNotExist(err):
			msg, code = "404 page not found", http.StatusNotFound
		case os.IsPermission(err):
			msg, code = "403 Forbidden", http.StatusForbidden
		default:
			msg, code = fmt.Sprintf("500 Internal Server Error: %s", err), http.StatusInternalServerError
		}
		http.Error(w, msg, code)
		log.Println(err)
		return
	}
}

func run() error {
	addr := *addr
	hdlr := &generator{}
	//hdlr := http.FileServer(fs)

	return http.ListenAndServe(addr, hdlr)
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}
