# QA Checklist - Prueba Técnica BeKind Actions

Checklist de 10 pruebas funcionales del flujo completo.

| #   | Flujo        | Caso de Prueba                                           | Estado |
| --- | ------------ | -------------------------------------------------------- | ------ |
| 1   | Login        | Login con credenciales válidas → redirect a dashboard    | ✅     |
| 2   | Login        | Login con credenciales inválidas → mensaje de error      | ✅     |
| 3   | Login        | Campos vacíos → muestra validación de formulario         | ✅     |
| 4   | Listado      | Lista de acciones se carga y muestra correctamente       | ✅     |
| 5   | Listado      | Loading state visible mientras carga los datos           | ✅     |
| 6   | Paginación   | Navegar a página siguiente funciona correctamente        | ✅     |
| 7   | Paginación   | Navegar a página anterior funciona correctamente         | ✅     |
| 8   | Crear Acción | Botón cancelar → vuelve al dashboard sin guardar         | ✅     |
| 9   | Crear Acción | Submit exitoso → mensaje de éxito + redirect a dashboard | ✅     |
| 10  | Crear Acción | Submit fallido → muestra mensaje de error                | ✅     |
