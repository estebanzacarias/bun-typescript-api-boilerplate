# Contributing to Bun TypeScript API Boilerplate

¡Gracias por tu interés en contribuir a este proyecto! Este es un proyecto de referencia que demuestra mejores prácticas en desarrollo Node.js con Bun y TypeScript.

## 🚀 Cómo Contribuir

### 1. Fork y Clone
```bash
git clone https://github.com/tu-usuario/bun-typescript-api-boilerplate.git
cd bun-typescript-api-boilerplate
```

### 2. Instalar Dependencias
```bash
bun install
```

### 3. Crear una Rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### 4. Hacer Cambios
- Sigue las convenciones de código existentes
- Asegúrate de que el código pase el linting: `bun run lint`
- Agrega tests si es necesario

### 5. Commit y Push
```bash
git add .
git commit -m "feat: descripción de los cambios"
git push origin feature/nueva-funcionalidad
```

### 6. Crear Pull Request
- Describe claramente los cambios
- Incluye ejemplos de uso si es necesario
- Referencia issues relacionados

## 📝 Convenciones

### Commits
Usa [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nueva funcionalidad
- `fix:` corrección de bugs
- `docs:` cambios en documentación
- `style:` formato, punto y coma faltante, etc.
- `refactor:` refactorización de código
- `test:` agregar o modificar tests
- `chore:` mantenimiento

### Código
- Usa TypeScript estricto
- Sigue las reglas de ESLint configuradas
- Documenta funciones complejas
- Usa nombres descriptivos para variables y funciones

## 🎯 Áreas de Mejora

### Prioridad Alta
- [ ] Tests unitarios e integración
- [ ] Documentación con Swagger/OpenAPI
- [ ] Integración con base de datos
- [ ] Rate limiting
- [ ] Logging estructurado

### Prioridad Media
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Refresh automático de tokens
- [ ] Validación de entrada más robusta

### Prioridad Baja
- [ ] GraphQL support
- [ ] WebSocket support
- [ ] Microservices architecture
- [ ] Performance monitoring

## 🐛 Reportar Bugs

1. Verifica que no sea un problema conocido
2. Crea un issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Información del entorno (OS, Bun version, etc.)

## 💡 Sugerir Mejoras

1. Crea un issue con la etiqueta `enhancement`
2. Describe la mejora propuesta
3. Explica el beneficio
4. Incluye ejemplos si es posible

## 📚 Recursos

- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

¡Gracias por contribuir! 🎉
