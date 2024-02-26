# elixir-module README

## Features

This extension gives two commands to copy the closest module name:
1. "Copy short module name". Example:
```elixir
defmodule MyProject.MyDomain.MyEntity do
end
```
If the cursor is located within the module the command will copy only `MyEntity` to the clipboard.

2. "Copy full module name". Example:
```elixir
defmodule MyProject.MyDomain.MyEntity do
end
```
If the cursor is located within the module the command will copy the whole `MyProject.MyDomain.MyEntity` to the clipboard.

Example of nested modules:
```elixir
defmodule A.B do
  defmodule C do
    defmodule D do
    end
  end
end
```
If the cursor is located within the `D` module the command will copy the whole `A.B.C.D` to the clipboard.
