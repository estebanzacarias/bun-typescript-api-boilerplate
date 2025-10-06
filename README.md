# 🚀 Node.js API con Bun - Proyecto de Referencia

[![Bun](https://img.shields.io/badge/Bun-1.0+-black?style=flat-square&logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-9.36+-purple?style=flat-square&logo=eslint)](https://eslint.org/)

Una API REST moderna construida con **Bun**, **TypeScript** y mejores prácticas de desarrollo. Este proyecto sirve como referencia para configuraciones, arquitectura y patrones de código en aplicaciones Node.js modernas.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Endpoints](#-endpoints)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Mejores Prácticas Implementadas](#-mejores-prácticas-implementadas)
- [Scripts Disponibles](#-scripts-disponibles)
- [Contribución](#-contribución)

## ✨ Características

- 🔐 **Autenticación JWT** con access y refresh tokens
- 🛡️ **Autorización basada en roles** (Admin/User)
- 📝 **Validación de datos** con Valibot
- 🔒 **Encriptación de contraseñas** con bcrypt
- 🏗️ **Arquitectura modular** y escalable
- 📊 **Manejo de errores** centralizado
- 🎯 **TypeScript estricto** para mayor seguridad
- 🚀 **Hot reload** con Bun
- 📏 **ESLint** configurado con Airbnb standards

## 🛠️ Tecnologías

### Runtime y Lenguaje
- **[Bun](https://bun.sh)** - Runtime JavaScript ultra-rápido
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático

### Dependencias Principales
- **[Valibot](https://valibot.dev/)** - Validación de esquemas
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - Manejo de JWT
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Encriptación de contraseñas
- **[cors](https://github.com/expressjs/cors)** - Configuración CORS

### Herramientas de Desarrollo
- **[ESLint](https://eslint.org/)** - Linting con configuración Airbnb
- **[TypeScript ESLint](https://typescript-eslint.io/)** - Reglas específicas para TS

## 🏗️ Arquitectura

```
src/
├── config.ts              # Configuración de la aplicación
├── index.ts               # Punto de entrada del servidor
├── middleware/            # Middlewares de autenticación y autorización
│   ├── authentication.ts  # Verificación de JWT
│   └── authorization.ts   # Control de acceso por roles
├── models/                # Modelos de datos y lógica de negocio
│   ├── user.ts           # Gestión de usuarios
│   ├── character.ts      # Gestión de personajes
│   ├── revokeToken.ts    # Gestión de tokens revocados
│   └── api.ts            # Tipos y constantes de API
├── routes/                # Definición de rutas
│   ├── auth.ts           # Rutas de autenticación
│   └── character.ts      # Rutas de personajes
└── utils/                 # Utilidades
    └── parseBody.ts      # Parser de cuerpos de petición
```

## 🚀 Instalación

### Prerrequisitos
- [Bun](https://bun.sh/docs/installation) >= 1.0.0
- Node.js >= 18.0.0 (opcional, para compatibilidad)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd curso-node-intensivo
```

2. **Instalar dependencias**
```bash
bun install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env (opcional)
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_REFRESH_SECRET=tu_jwt_refresh_secret_super_seguro
PORT=4000
```

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `JWT_SECRET` | Clave secreta para JWT | `"secret"` |
| `JWT_REFRESH_SECRET` | Clave secreta para refresh tokens | `"refresh_secret"` |
| `PORT` | Puerto del servidor | `4000` |

### Configuración de TypeScript

El proyecto utiliza una configuración estricta de TypeScript con:
- `verbatimModuleSyntax: true` - Importaciones explícitas
- `strict: true` - Modo estricto habilitado
- `noUncheckedIndexedAccess: true` - Acceso seguro a arrays/objetos

## 🎯 Uso

### Iniciar el servidor en desarrollo
```bash
bun run dev
```

### Linting
```bash
# Verificar errores
bun run lint

# Corregir errores automáticamente
bun run lint:fix
```

El servidor estará disponible en `http://localhost:4000`

## 📡 Endpoints

### 🔐 Autenticación

#### `POST /auth/register`
Registra un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "id": 1759758433772,
  "email": "usuario@ejemplo.com",
  "password": "$2b$10$...",
  "role": "user"
}
```

#### `POST /auth/login`
Inicia sesión con credenciales.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `POST /auth/logout`
Cierra sesión y revoca tokens.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### 👤 Personajes

#### `GET /characters`
Obtiene todos los personajes (requiere autenticación).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
[
  {
    "id": 1759758433772,
    "name": "Juan",
    "lastName": "Pérez"
  }
]
```

#### `GET /characters/:id`
Obtiene un personaje específico (requiere autenticación).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "id": 1759758433772,
  "name": "Juan",
  "lastName": "Pérez"
}
```

#### `POST /characters`
Crea un nuevo personaje (requiere autenticación y rol Admin/User).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "María",
  "lastName": "González"
}
```

**Response (201):**
```json
{
  "id": 1759758433772,
  "name": "María",
  "lastName": "González"
}
```

#### `PATCH /characters/:id`
Actualiza un personaje (requiere autenticación y rol Admin/User).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "María",
  "lastName": "González"
}
```

**Response (200):**
```json
{
  "id": 1759758433772,
  "name": "María",
  "lastName": "González"
}
```

#### `DELETE /characters/:id`
Elimina un personaje (requiere autenticación y rol Admin/User).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "message": "Character deleted successfully"
}
```

## 📁 Estructura del Proyecto

### Archivos Principales

- **`index.ts`** - Punto de entrada, configuración del servidor HTTP
- **`config.ts`** - Configuración centralizada de la aplicación
- **`package.json`** - Dependencias y scripts del proyecto

### Middleware

- **`authentication.ts`** - Verificación de JWT y extracción de usuario
- **`authorization.ts`** - Control de acceso basado en roles

### Modelos

- **`user.ts`** - Gestión de usuarios, autenticación y validación
- **`character.ts`** - CRUD de personajes
- **`revokeToken.ts`** - Gestión de tokens revocados
- **`api.ts`** - Tipos y constantes de la API

### Rutas

- **`auth.ts`** - Endpoints de autenticación (register, login, logout)
- **`character.ts`** - Endpoints de personajes con middleware de autenticación

### Utilidades

- **`parseBody.ts`** - Parser seguro de cuerpos de petición HTTP

## 🎯 Mejores Prácticas Implementadas

### 🔒 Seguridad
- **Encriptación de contraseñas** con bcrypt
- **JWT con expiración** (1h access, 1d refresh)
- **Validación de entrada** con Valibot
- **Control de acceso** basado en roles
- **Revocación de tokens** en logout

### 🏗️ Arquitectura
- **Separación de responsabilidades** (models, routes, middleware)
- **Tipado estricto** con TypeScript
- **Manejo de errores** centralizado
- **Configuración** externalizada

### 📝 Código
- **ESLint** con reglas Airbnb
- **Importaciones explícitas** con `verbatimModuleSyntax`
- **Nomenclatura consistente** y descriptiva
- **Documentación** inline y README completo

### 🚀 Performance
- **Bun runtime** para máxima velocidad
- **Hot reload** para desarrollo eficiente
- **Estructura modular** para escalabilidad

## 📜 Scripts Disponibles

```json
{
  "dev": "bun run --hot index.ts",     // Servidor con hot reload
  "lint": "eslint . --ext .ts",        // Verificar código
  "lint:fix": "eslint . --ext .ts --fix" // Corregir errores automáticamente
}
```

## 🧪 Ejemplos de Uso

### Registro y Login Completo

```bash
# 1. Registrar usuario
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@email.com", "password": "password123"}'

# 2. Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@email.com", "password": "password123"}'

# 3. Crear personaje (usar token del login)
curl -X POST http://localhost:4000/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_access_token>" \
  -d '{"name": "Juan", "lastName": "Pérez"}'
```

## 🚧 Limitaciones y Mejoras Futuras

### Limitaciones Actuales
- **Almacenamiento en memoria** - Los datos se pierden al reiniciar
- **Sin base de datos** - Ideal para prototipos, no producción
- **Autenticación básica** - Sin refresh automático de tokens

### Mejoras Sugeridas
- [ ] Integración con base de datos (PostgreSQL/MongoDB)
- [ ] Refresh automático de tokens
- [ ] Rate limiting
- [ ] Logging estructurado
- [ ] Tests unitarios e integración
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Documentación con Swagger/OpenAPI

---

**Nota:** Este es un proyecto de referencia que demuestra configuraciones modernas, mejores prácticas y arquitectura escalable. Ideal para aprender, prototipar y como base para proyectos más complejos.

⭐ **¡Si te fue útil, dale una estrella al repositorio!**