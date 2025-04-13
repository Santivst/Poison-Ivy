# PoisonIvy – Tu tienda de plantas y jardinería

Hola! Este proyecto se llama **PoisonIvy**. Se trata de un ecommerce de plantas y productos de jardinería desarrollado con Expo y React Native. Esta aplicación fue creada por **Santiago Barreto** como entrega a la propuesta del curso de desarrollo de aplicaciones de Coderhouse.

## 🌱 ¿Qué es PoisonIvy?

PoisonIvy es una aplicación móvil pensada para amantes de las plantas y la jardinería. Permite explorar productos, ver sus detalles, agregarlos al carrito y realizar pedidos. Además, gestiona perfiles de usuarios, direcciones con geolocalización y almacena toda la información en Firebase.

Este proyecto nace desde el cariño que comparto junto con mi madre por las plantas. Quise reflejar ese vínculo en un proyecto en forma de una tienda online donde, quien sea que quisiera, pudiera adquirir plantas con comodidad desde su celular.

---

## 🛠️ Tecnologías utilizadas

Estas son las tecnologías y librerías que componen el stack del proyecto:

### Frameworks y plataformas

- **Expo** – Framework para desarrollo React Native con herramientas integradas
- **React Native** – Biblioteca para construir interfaces móviles nativas
- **Firebase** – Backend como servicio para autenticación, base de datos, almacenamiento y más

### Navegación

- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`

### Manejo de estado

- `@reduxjs/toolkit`
- `react-redux`
- `@redux-devtools/core`

### Librerías de Expo

- `expo-file-system`
- `expo-image-picker`
- `expo-location`
- `expo-media-library`
- `expo-sqlite`
- `expo-status-bar`

### Validaciones

- `yup`

### Compatibilidad Web

- `react-dom`
- `react-native-web`

---

## 📦 Instalación y ejecución

1. Clonar el repositorio
2. Instalar las dependencias:

```bash
npm install
```

---

## 📌 Consideraciones

1. ⚠️ Problema con la ventana de órdenes:
Las órdenes se registran correctamente en Firebase, pero por alguna razón no se muestran en la pestaña correspondiente de la app. Intenté varias soluciones y revisé el código, pero como no aparece ningún error en la consola, no logré ubicar con exactitud el problema.
2. Google Maps API:
Para la funcionalidad de localización utilicé la googleMapsApiKey compartida por el profesor en clase, ya que no pude crear una propia por falta de acceso o permisos adecuados.
3. ⚠️ Problema con los emuladores
Los emuladores que mostró el profe no fueron muy útiles para mi, pues el de android era muy lento, el de IOS que usa expo no lo podía usar, pues estoy en Windows, y la app nunca la pude hacer andar. Por eso la gran mayoría de las cosas las probé en web. Debería estar todo funcionando igual, pero si hay algún error en la versión de app me disculpo por no haberlo podido chequear.