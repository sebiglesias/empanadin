# 🥟 Calculadora de Empanadas

Una PWA (Progressive Web App) para organizar pedidos de empanadas cuando te juntás con amigos. Nunca más te olvides de cuántas empanadas pidió cada uno.

![Calculadora de Empanadas](https://sebiglesias.com.ar/empanadin/og-image.png)

## ✨ Características

- 👥 **Agregar personas**: Añade a todos tus amigos que van a la juntada
- 🥟 **Tipos de empanadas**: Incluye los sabores clásicos + tipos personalizados
- 📱 **PWA**: Se instala como app nativa en tu teléfono
- 💾 **Persistencia**: Los datos se guardan automáticamente en tu dispositivo
- 🧮 **Resumen automático**: Calcula el total por tipo de empanada
- 🎨 **Diseño responsive**: Funciona perfecto en móvil y desktop
- 🔄 **Funciona offline**: Una vez cargada, funciona sin internet

## 📱 Instalación como PWA

1. Abre el link en tu navegador móvil
2. En Chrome: Toca el menú (⋮) → "Agregar a pantalla de inicio"
3. En Safari: Toca compartir (📤) → "Agregar a pantalla de inicio"
4. ¡Listo! Ya tenés la app instalada

## 🛠️ Tecnologías utilizadas

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos (con CSS inline como fallback)
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de datos
- **Service Worker** - Funcionalidad offline

## 🏗️ Desarrollo local

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sebiglesias/empanadin.git
cd empanadin

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build para producción
npm run start    # Ejecutar build de producción
npm run lint     # Verificar código con ESLint
```

## 📦 Deployment

La app se deploya automáticamente en GitHub Pages usando GitHub Actions.

### Deploy manual

```bash
# Build estático
npm run build

# Los archivos estarán en ./out/
```

### Configuración para GitHub Pages

1. Fork este repositorio
2. Ve a Settings → Pages
3. Selecciona "GitHub Actions" como source
4. El workflow se ejecutará automáticamente en cada push a \`main\`

## 🎯 Uso

### 1. Agregar personas
- Escribe el nombre de cada amigo
- Presiona "+" o Enter para agregar

### 2. Seleccionar empanadas
- Para cada persona, selecciona el tipo de empanada
- Usa los botones +/- para ajustar cantidades
- Agrega tipos personalizados si el lugar tiene sabores especiales

### 3. Ver resumen
- El resumen se actualiza automáticamente
- Muestra el total por tipo de empanada
- Perfecto para llamar y hacer el pedido

### 4. Tipos personalizados
- Agrega sabores únicos como "Roquefort y Nuez", "Cordero", etc.
- Se guardan para usar en futuras juntadas
- Elimina los que ya no uses

## 🔧 Configuración

### Personalización

Para personalizar la app:

1. **Colores**: Modifica las variables CSS en \`app/globals.css\`
2. **Tipos de empanadas**: Edita el array \`tiposEmpanadas\` en \`app/page.tsx\`
3. **Manifest**: Actualiza \`public/manifest.json\` para cambiar nombre, iconos, etc.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

### Ideas para contribuir

- 💰 Agregar cálculo de precios
- 📤 Botón para compartir pedido por WhatsApp
- 🌙 Modo oscuro
- 🌍 Soporte para otros idiomas


## 🐛 Reportar bugs

Si encontrás algún problema:

1. Revisa si ya existe un [issue similar](https://github.com/sebiglesias/empanadin/issues)
2. Si no existe, [crea un nuevo issue](https://github.com/sebiglesias/empanadin/issues/new)
3. Incluye detalles sobre el problema y cómo reproducirlo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Sebastián Iglesias**
- Website: [sebiglesias.com.ar](https://sebiglesias.com.ar)
- GitHub: [@sebiglesias](https://github.com/sebiglesias)
- LinkedIn: [Sebastián Iglesias](https://linkedin.com/in/sebiglesias)

---

*Hecho con ❤️ en Argentina 🇦🇷*
