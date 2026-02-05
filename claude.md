# LostAndFoundNative - Claude Guide

## Struktura Projekta

```
LostAndFoundNative/
├── app/                              # Expo Router (file-based routing)
│   ├── _layout.tsx                   # Root layout (AuthProvider, Theme)
│   ├── index.tsx                     # Redirect to /(tabs)
│   ├── login.tsx                     # Login ekran
│   ├── register.tsx                  # Register ekran + terms checkbox
│   ├── terms.tsx                     # Terms of Service ekran
│   ├── privacy.tsx                   # Privacy Policy ekran
│   └── (tabs)/                       # Zaštićene rute
│       ├── _layout.tsx               # Tab konfiguracija
│       ├── index.tsx                 # Home
│       └── explore.tsx               # Explore
├── src/
│   ├── api/
│   │   ├── http.ts                   # Axios instanca + interceptori
│   │   ├── auth.api.ts               # Auth API pozivi
│   │   └── index.ts                  # Barrel export
│   ├── components/
│   │   ├── expo/                     # Expo template komponente
│   │   │   ├── Collapsible.tsx
│   │   │   ├── ExternalLink.tsx
│   │   │   ├── HapticTab.tsx
│   │   │   ├── IconSymbol.tsx
│   │   │   ├── ParallaxScrollView.tsx
│   │   │   ├── ThemedText.tsx
│   │   │   └── ThemedView.tsx
│   │   ├── forms/
│   │   │   ├── FormInput.tsx         # RHF input wrapper
│   │   │   └── FormCheckbox.tsx      # RHF checkbox wrapper
│   │   ├── ui/
│   │   │   ├── Button.tsx            # Button komponenta
│   │   │   └── FullScreenLoader.tsx  # Loading spinner
│   │   ├── modal/MessageModal.tsx    # Confirmation dialog
│   │   └── toast/ToastConfig.tsx     # Toast stilovi
│   ├── content/
│   │   └── legal.ts                  # Terms & Privacy sadržaj
│   ├── constants/
│   │   ├── strings.ts                # UI tekstovi
│   │   ├── validation.ts             # Validaciona pravila
│   │   ├── storage.ts                # AsyncStorage ključevi
│   │   ├── toast.ts                  # Toast konfiguracija
│   │   ├── routes.ts                 # Route konfiguracija
│   │   └── theme.ts                  # PALETA BOJA (jedan izvor istine)
│   ├── hooks/
│   │   ├── useAuthGuard.ts           # Auth navigation guard
│   │   ├── useColorScheme.ts         # React Native useColorScheme
│   │   └── useThemeColor.ts          # Theme color resolver
│   ├── services/
│   │   ├── token.service.ts          # Token management
│   │   └── toast.service.ts          # Toast wrapper
│   └── store/
│       ├── AuthContext.tsx           # Auth state
│       └── MessageContext.tsx        # Confirmation state
└── tailwind.config.js                # NativeWind konfiguracija
```

---

## Paleta Boja (VAŽNO!)

### PRAVILO: Uvek koristi boje iz palete!

**NIKAD ne koristi custom/hardcoded boje** (npr. `#FF0000`, `bg-[#123456]`).

Ako ti treba boja koja ne postoji u paleti:
1. Zatraži dodavanje u paletu
2. Dodaj je u `src/constants/theme.ts`
3. Dodaj CSS varijablu u `tailwind.config.js`
4. Tek onda koristi

### Primary Paleta (#F54927)

| Klasa | Hex | Upotreba |
|-------|-----|----------|
| `primary-50` | `#FEF1F0` | Najsvetlija pozadina |
| `primary-100` | `#FDDEDD` | Hover states |
| `primary-200` | `#FBC1BD` | Light accent |
| `primary-300` | `#FA9D96` | - |
| `primary-400` | `#F87669` | - |
| `primary-500` | `#F54927` | **Osnovna boja** |
| `primary-600` | `#C3381D` | Hover na dugmadima |
| `primary-700` | `#952913` | Pressed state |
| `primary-800` | `#691A0A` | - |
| `primary-900` | `#3D0B03` | - |
| `primary-950` | `#2C0602` | Najtamnija |

### Semantic Boje

| Klasa | Hex | Upotreba |
|-------|-----|----------|
| `success` | `#34C759` | Uspešne akcije |
| `warning` | `#FF9500` | Upozorenja |
| `error` | `#FF3B30` | Greške, destructive |
| `info` | `#007AFF` | Informacije |

### Theme Boje (automatski light/dark)

| Klasa | Light | Dark | Upotreba |
|-------|-------|------|----------|
| `background` | `#FFFFFF` | `#0D0D0D` | Pozadina ekrana |
| `surface` | `#F8F8F8` | `#1A1A1A` | Sekcije, grupacije |
| `card` | `#FFFFFF` | `#262626` | Kartice |
| `text` | `#1A1A1A` | `#FAFAFA` | Glavni tekst |
| `text-secondary` | `#6B7280` | `#A1A1AA` | Sekundarni tekst |
| `text-muted` | `#9CA3AF` | `#71717A` | Placeholder, hint |
| `border` | `#E5E5E5` | `#3F3F46` | Borderi |
| `border-light` | `#F0F0F0` | `#27272A` | Subtle borderi |

### Primeri Korišćenja

```tsx
// ✅ ISPRAVNO - koristi klase iz palete
<View className="bg-background">
  <Text className="text-text">Naslov</Text>
  <Text className="text-text-secondary">Podnaslov</Text>
  <Button className="bg-primary" />
  <Button className="bg-primary-600" /> {/* hover/darker */}
  <Text className="text-error">Greška</Text>
</View>

// ❌ POGREŠNO - hardcoded boje
<View className="bg-[#FFFFFF]">
  <Text className="text-[#000000]">Naslov</Text>
  <Text style={{ color: '#666' }}>Podnaslov</Text>
</View>
```

### Dodavanje Nove Boje u Paletu

1. **Definiši u `src/constants/theme.ts`:**
```typescript
const lightTheme = {
  // ... postojeće
  myNewColor: '#AABBCC',
};

const darkTheme = {
  // ... postojeće
  myNewColor: '#112233',
};

// Dodaj u themes.light i themes.dark:
'--color-my-new': lightTheme.myNewColor,
```

2. **Dodaj u `tailwind.config.js`:**
```javascript
colors: {
  // ... postojeće
  'my-new': 'var(--color-my-new)',
}
```

3. **Koristi:**
```tsx
<View className="bg-my-new" />
```

---

## Tipovi (DTOs)

### Izvor: @lost-and-found/api paket

Tipovi se importuju iz zajedničkog NPM paketa, ne iz lokalnog fajla:

```typescript
import {
  AuthRequestDTO,
  AuthResponseDTO,
  RegisterRequestDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from "@lost-and-found/api";
```

### Trenutni Auth Tipovi

```typescript
// Login
interface AuthRequestDTO {
  email: string;
  password: string;
}

// Register (trenutna implementacija)
interface RegisterRequestDTO {
  email: string;
  username: string;
  password: string;
}

// Response
interface AuthResponseDTO {
  token?: string;
  refreshToken?: string;
  message?: string;
}

// Token Refresh
interface RefreshTokenRequestDTO {
  refreshToken?: string;
}

interface RefreshTokenResponseDTO {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}
```

### Dodavanje Novog Tipa

Novi tipovi se dodaju u `lost-and-found-api` paket:

1. Dodaj tip u `lost-and-found-api/src/index.ts`
2. Rebuild paket: `npm run build`
3. Importuj u Native projektu iz `@lost-and-found/api`

---

## Forme i Validacija

### Kreiranje Forme

```typescript
import { useForm } from "react-hook-form";
import { FormInput } from "../src/components/forms";
import { VALIDATION_RULES } from "../src/constants";
import { MyDTO } from "@lost-and-found/api";

export default function MyScreen() {
  const { control, handleSubmit } = useForm<MyDTO>();

  const onSubmit = async (data: MyDTO) => {
    // API poziv
  };

  return (
    <View>
      <FormInput
        control={control}
        name="fieldName"
        placeholder="Placeholder"
        rules={VALIDATION_RULES.fieldName}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

### Validaciona Pravila (src/constants/validation.ts)

```typescript
export const PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^[+]?[\d\s-]{6,20}$/,
} as const;

export const VALIDATION_RULES = {
  email: {
    required: AUTH_STRINGS.EMAIL_REQUIRED,
    pattern: { value: PATTERNS.EMAIL, message: AUTH_STRINGS.EMAIL_INVALID },
  },
  password: {
    required: AUTH_STRINGS.PASSWORD_REQUIRED,
    minLength: { value: 6, message: AUTH_STRINGS.PASSWORD_MIN_LENGTH },
  },
  username: {
    required: AUTH_STRINGS.USERNAME_REQUIRED,
    minLength: { value: 3, message: AUTH_STRINGS.USERNAME_MIN_LENGTH },
  },
  // Dodaj nova pravila ovde
};
```

### Dodavanje Novog Polja

1. Dodaj DTO tip u `@lost-and-found/api` paket
2. Dodaj string konstante u `src/constants/strings.ts`
3. Dodaj validaciju u `src/constants/validation.ts`
4. Koristi `<FormInput>` ili `<FormCheckbox>` sa pravilima

### FormCheckbox Komponenta

Za boolean polja (checkboxes) koristi `FormCheckbox`:

```typescript
<FormCheckbox
  control={control}
  name="termsAccepted"
  rules={VALIDATION_RULES.termsAccepted}
>
  <Text>I agree to the Terms</Text>
</FormCheckbox>
```

### FormInput Features

- **Floating label** - placeholder se animira gore na fokus
- **Focus border** - `border-primary` kad je fokusiran
- **Error state** - `border-error` kad ima grešku
- **Dark mode** - koristi `bg-input` i boje iz palete
- **Animacija** - React Native Animated API sa interpolacijom
- **Ikona** - opciona ikona na početku polja

### FormInput sa Ikonom

Koristimo **FontAwesome** iz `@expo/vector-icons`:

```tsx
<FormInput
  control={control}
  name="email"
  placeholder="Email"
  icon="envelope"  // FontAwesome ikona
/>

<FormInput
  control={control}
  name="password"
  placeholder="Password"
  icon="lock"
/>
```

**Dostupne ikone:** [icons.expo.fyi](https://icons.expo.fyi) → filtriraj "FontAwesome"

**VAŽNO:** `className` NE RADI za boju ikone - FontAwesome koristi direktno `color` prop:

```tsx
// ❌ Ne radi
<FontAwesome className="text-primary" />

// ✅ Radi - koristi vrednosti iz palete
<FontAwesome color={primary[500]} />
```

---

## API Pozivi

### HTTP Setup (src/api/http.ts)

```typescript
const API_BASE_URL = "http://localhost:8082";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
```

### Request Interceptor

- Automatski dodaje `Authorization: Bearer {token}` header

### Response Interceptor

- 401/403 → Pokušaj token refresh
- Ostale greške → Prikaži toast automatski
- `_silent: true` → Ne prikazuj toast

### Kreiranje Novog API Modula

```typescript
// src/api/items.api.ts
import http from "./http";
import { ItemDTO, CreateItemDTO } from "@lost-and-found/api";

export const itemsApi = {
  getAll: () => http.get<ItemDTO[]>("/items"),
  getById: (id: string) => http.get<ItemDTO>(`/items/${id}`),
  create: (data: CreateItemDTO) => http.post<ItemDTO>("/items", data),
  update: (id: string, data: Partial<CreateItemDTO>) =>
    http.put<ItemDTO>(`/items/${id}`, data),
  delete: (id: string) => http.delete(`/items/${id}`),
};
```

### Korišćenje u Komponenti

```typescript
import { itemsApi } from "../src/api/items.api";

const fetchItems = async () => {
  try {
    const response = await itemsApi.getAll();
    setItems(response.data);
  } catch {
    // Greška se automatski prikazuje kroz interceptor
  }
};
```

---

## Prikaz Grešaka

### Automatski (Interceptor)

Sve API greške se automatski prikazuju kroz `toastService.error()`.

Greška se izvlači iz:

1. `error.response.data.message`
2. `error.response.data.error`
3. `error.message`
4. `COMMON_STRINGS.ERROR_GENERIC` (fallback)

### Ručni Toast

```typescript
import { toastService } from "../src/services";

toastService.success("Naslov", "Poruka");
toastService.error("Naslov", "Poruka");
toastService.warning("Naslov", "Poruka");
toastService.info("Naslov", "Poruka");
```

### Toast Opcije

```typescript
toastService.success("Naslov", "Poruka", {
  duration: 4000,
  onPress: () => console.log("Pressed"),
  onHide: () => console.log("Hidden"),
});
```

---

## Confirmation Dialog

### Korišćenje

```typescript
import { useMessage } from "../src/store/MessageContext";

function MyComponent() {
  const { confirm } = useMessage();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete Item",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      cancelText: "Cancel",
      destructive: true, // Crveno dugme
    });

    if (confirmed) {
      await deleteItem();
    }
  };
}
```

### MessageModalConfig

```typescript
interface MessageModalConfig {
  title: string;
  message?: string;
  confirmText?: string; // Default: "Confirm"
  cancelText?: string; // Default: "Cancel"
  destructive?: boolean; // Default: false
}
```

---

## Konstante

### Strings (src/constants/strings.ts)

```typescript
export const AUTH_STRINGS = {
  LOGIN_TITLE: "Login",
  EMAIL_PLACEHOLDER: "Email",
  EMAIL_REQUIRED: "Email is required",
  // ...
} as const;

export const COMMON_STRINGS = {
  ERROR_TITLE: "Error",
  ERROR_GENERIC: "Something went wrong",
  SUCCESS_TITLE: "Success",
  // ...
} as const;

export const A11Y_STRINGS = {
  EMAIL_INPUT: "Email input field",
  PASSWORD_INPUT: "Password input field",
  // ...
} as const;

export const LEGAL_STRINGS = {
  TERMS_TITLE: "Terms of Service",
  PRIVACY_TITLE: "Privacy Policy",
  TERMS_CHECKBOX_PREFIX: "By registering, I agree to the ",
  TERMS_LINK: "Terms of Service",
  AND: " and ",
  PRIVACY_LINK: "Privacy Policy",
  TERMS_REQUIRED: "You must accept the terms to continue",
} as const;
```

### Dodavanje Novih Stringova

```typescript
// src/constants/strings.ts
export const ITEMS_STRINGS = {
  CREATE_TITLE: "Report Item",
  TITLE_PLACEHOLDER: "Item title",
  TITLE_REQUIRED: "Title is required",
  // ...
} as const;

// src/constants/index.ts
export * from "./strings"; // Već uključeno
```

---

## Routing & Navigation Guard

### Route Konfiguracija (src/constants/routes.ts)

```typescript
export const ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  TABS: "(tabs)",
  TERMS: "terms",
  PRIVACY: "privacy",
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.TERMS, ROUTES.PRIVACY];
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
```

### useAuthGuard Hook (src/hooks/useAuthGuard.ts)

Centralizovana logika za zaštitu ruta:

```typescript
import { useAuthGuard } from "../src/hooks";

function RootLayoutNav() {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return <FullScreenLoader />;
  }
  // ...
}
```

**Automatski:**
- Neautentifikovani korisnici → `/login`
- Autentifikovani na auth rutama → `/(tabs)`
- Public rute (terms, privacy) → Dostupne svima

### Dodavanje Nove Rute

1. Dodaj u `ROUTES` konstante
2. Dodaj u `PUBLIC_ROUTES` ili ostavi kao protected
3. Kreiraj `app/ruta.tsx` fajl
4. Dodaj `Stack.Screen` u `app/_layout.tsx`

---

## Auth Flow (od A do Š)

### 1. App Pokretanje

```
_layout.tsx
  └── AuthProvider (wrap)
        └── MessageProvider (wrap)
              └── RootLayoutNav
                    └── useAuthGuard()
                          ├── isLoading? → FullScreenLoader
                          ├── !isAuthenticated? → /login
                          └── isAuthenticated? → /(tabs)
```

### 2. Login Flow

```
Korisnik popunjava formu
    ↓
handleSubmit(onSubmit)
    ↓
login(data) [AuthContext]
    ↓
authApi.login(data) → POST /auth/login
    ↓
Response: { token, refreshToken }
    ↓
tokenService.setTokens()
  ├── AsyncStorage.setItem()
  └── notifyListeners(true)
    ↓
AuthContext: isAuthenticated = true
    ↓
RootLayoutNav: router.replace('/(tabs)')
```

### 3. API Request Flow

```
http.get('/protected')
    ↓
Request Interceptor:
  └── Dodaj Authorization header
    ↓
Server Response
    ↓
Response Interceptor:
  ├── 200 OK → Vrati response
  ├── 401/403 → Token refresh flow
  └── Ostalo → showErrorToast() + reject
```

### 4. Token Refresh Flow

```
401/403 Error
    ↓
Ima refreshToken?
  ├── NE → clearTokens() + showErrorToast() + reject
  └── DA → POST /auth/refresh
            ├── Success → updateTokens() + retry original
            └── Fail → clearTokens() + showErrorToast() + reject
```

### 5. Logout Flow

```
Korisnik klikne Logout
    ↓
confirm({ title: "Logout", ... })
    ↓
Potvrđeno?
  └── DA → logout() [AuthContext]
            ↓
          tokenService.clearTokens()
            ├── AsyncStorage.removeItem()
            └── notifyListeners(false)
            ↓
          AuthContext: isAuthenticated = false
            ↓
          RootLayoutNav: router.replace('/login')
```

---

## Kreiranje Novog Feature-a (Checklist)

### 1. Tipovi

- [ ] Dodaj DTO u `@lost-and-found/api` paket (ako treba novi tip)

### 2. Konstante

- [ ] Dodaj stringove u `src/constants/strings.ts`
- [ ] Dodaj validaciju u `src/constants/validation.ts`

### 3. API

- [ ] Kreiraj `src/api/feature.api.ts`
- [ ] Exportuj iz `src/api/index.ts`

### 4. Ekran

- [ ] Kreiraj `app/feature.tsx` ili `app/(tabs)/feature.tsx`
- [ ] Dodaj rutu u `app/_layout.tsx` ili `app/(tabs)/_layout.tsx`

### 5. Forma (ako treba)

- [ ] Koristi `useForm<DTO>()`
- [ ] Koristi `<FormInput>` sa `rules={VALIDATION_RULES.field}`

### 6. Error Handling

- [ ] API greške se automatski prikazuju
- [ ] Za custom greške koristi `toastService`

### 7. Confirmations

- [ ] Za destructive akcije koristi `useMessage().confirm()`

---

## NativeWind Styling

### Uobičajene Klase

```typescript
// Container
className="flex-1 justify-center items-center p-5 bg-background"

// Tekst
className="text-2xl font-bold text-text"
className="text-base text-text-secondary"
className="text-sm text-text-muted"
className="text-sm text-error"

// Input
className="border rounded-lg px-4 py-3 text-text bg-card border-border"
className="border-error" // Greška

// Kartice
className="bg-card rounded-xl p-4 border border-border"

// Dugmad
className="rounded-lg py-4 items-center justify-center bg-primary"
className="bg-primary-600" // Hover/pressed
className="border border-primary bg-transparent" // Outline
```

---

## Expo Komponente (src/components/expo/)

| Komponenta | Namena |
|------------|--------|
| `ThemedText` | Text sa varijantama (title, subtitle, link) |
| `ThemedView` | View sa theme support |
| `ExternalLink` | Link koji otvara in-app browser |
| `HapticTab` | Tab button sa haptic feedback |
| `ParallaxScrollView` | Scroll sa parallax header efektom |
| `Collapsible` | Accordion/collapsible sekcija |
| `IconSymbol` | SF Symbols / Material Icons wrapper |

---

## Pravila

1. **Boje** - UVEK iz palete, NIKAD hardcoded. Ako treba nova boja → dodaj u paletu
2. **Forme** - Uvek koristi `react-hook-form` + `FormInput`
3. **Validacija** - Pravila u `constants/validation.ts`, stringovi u `strings.ts`
4. **API** - Greške se automatski prikazuju, NE ručno u catch bloku
5. **Tipovi** - Importuj iz `@lost-and-found/api` paketa
6. **Confirmation** - Za destructive akcije koristi `useMessage().confirm()`
7. **Toast** - Za ručne notifikacije koristi `toastService`
8. **Styling** - NativeWind klase, boje iz `src/constants/theme.ts`
