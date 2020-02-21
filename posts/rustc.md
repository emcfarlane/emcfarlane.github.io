# [WIP] Rust on Beaglebone Blue

Generate c bindings to [robotics lib](https://github.com/StrawsonDesign/librobotcontrol).

#### filelayout
```
.
├── build.rs
├── librobotcontrol.a
├── src
│   ├── main.rs
.
```

```
// build.rs
use std::env;
use std::path::Path;

fn main() {
    let dir = env::var("CARGO_MANIFEST_DIR").unwrap();
    println!("cargo:rustc-link-lib=static=robotcontrol");
    println!(
        "cargo:rustc-link-search=native={}",
        Path::new(&dir).display()
    );
}
```
