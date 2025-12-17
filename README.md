# Othic Level Test

Proyecto con **Frontend (PrimeReact)** y **Backend (.NET)**.

## Requisitos
- Node.js + npm
- .NET SDK
- Una base de datos (según tu configuración local)

---

## 1) Clonar el repositorio
```bash
git clone https://github.com/ipek9/Othic-level-test.git
cd Othic-level-test
```

---

## 2) Crear tablas en la Base de Datos

Antes de ejecutar el backend, debes crear las tablas necesarias en tu BBDD.

### Tablas requeridas

**Categories**
- Id
- Name

**Products**
- Id
- Name
- Description
- Price
- CategoryId

> **Nota:** `CategoryId` debe estar relacionado con `Categories.Id`.

---

## 3) Configurar el Backend (.NET)

Una vez creadas las tablas, configura la conexión a tu base de datos en el archivo `appsettings.json` del proyecto backend.

Busca y completa la sección:

```json
"ConnectionStrings": {
  "DefaultConnection": "Añadir Entorno Local"
}
```

---

## 4) Instalar y ejecutar el Frontend (PrimeReact)

En la carpeta del frontend: 

```bash
npm install
```

Ejecuta el proyecto en modo desarrollo:

```bash
npm run dev
```

---

## 5) Uso

1. Arranca primero el **Backend**
2. Luego arranca el **Frontend**
3. Abre la URL que te muestre la consola de `npm run dev` (normalmente `http://localhost:5173`)

---