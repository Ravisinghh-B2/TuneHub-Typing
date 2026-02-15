// ========================================
// TUNEHUB - CODE SNIPPETS DATABASE
// 6 Languages × 35 Levels = 210 Snippets
// ========================================

const codeSnippets = {
    html: {
        // BASIC (Levels 1-20): Fundamental HTML elements and structure
        basic: [
            '<div class="container">\n  <h1>Hello World</h1>\n</div>',
            '<p class="text">Welcome to our site</p>',
            '<button onclick="handleClick()">Click me</button>',
            '<img src="logo.png" alt="Logo">',
            '<a href="/about">About Us</a>',
            '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
            '<form action="/submit" method="post">\n  <input type="text" name="username">\n</form>',
            '<header>\n  <nav class="navbar">Navigation</nav>\n</header>',
            '<section id="main">\n  <article>Content here</article>\n</section>',
            '<input type="email" placeholder="Enter email" required>',
            '<label for="name">Name:</label>\n<input id="name" type="text">',
            '<select name="options">\n  <option value="1">Option 1</option>\n</select>',
            '<textarea rows="4" cols="50">Enter text</textarea>',
            '<footer>\n  <p>&copy; 2024 Company</p>\n</footer>',
            '<div class="card">\n  <h2>Title</h2>\n  <p>Description</p>\n</div>',
            '<span class="badge">New</span>',
            '<table>\n  <tr><td>Cell 1</td><td>Cell 2</td></tr>\n</table>',
            '<iframe src="page.html" width="600"></iframe>',
            '<video controls src="video.mp4"></video>',
            '<audio controls src="audio.mp3"></audio>'
        ],

        // INTERMEDIATE (Levels 21-26): More complex structures
        intermediate: [
            '<div class="grid">\n  <div class="col">Column 1</div>\n  <div class="col">Column 2</div>\n</div>',
            '<form class="signup-form">\n  <input type="password" required>\n  <button type="submit">Sign Up</button>\n</form>',
            '<nav aria-label="Main">\n  <ul role="menubar">\n    <li role="menuitem">Home</li>\n  </ul>\n</nav>',
            '<picture>\n  <source srcset="image.webp" type="image/webp">\n  <img src="image.jpg" alt="Image">\n</picture>',
            '<details>\n  <summary>Click to expand</summary>\n  <p>Hidden content here</p>\n</details>',
            '<dialog id="modal">\n  <p>Modal content</p>\n  <button onclick="closeModal()">Close</button>\n</dialog>'
        ],

        // ADVANCED (Levels 29-35): Semantic HTML, accessibility, modern features
        advanced: [
            '<template id="card-template">\n  <div class="card">\n    <slot name="title"></slot>\n  </div>\n</template>',
            '<article itemscope itemtype="schema.org/Article">\n  <h1 itemprop="headline">Article Title</h1>\n  <time itemprop="datePublished">2024-01-01</time>\n</article>',
            '<form aria-labelledby="form-title">\n  <fieldset>\n    <legend id="form-title">User Info</legend>\n  </fieldset>\n</form>',
            '<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="blue" />\n</svg>',
            '<meta name="viewport" content="width=device-width">\n<link rel="preload" href="font.woff2" as="font">',
            '<canvas id="canvas" width="800" height="600">\n  Fallback content for browsers\n</canvas>',
            '<data value="42" class="metric">Forty-two</data>\n<time datetime="2024-01-01T12:00">Noon</time>'
        ]
    },

    css: {
        // BASIC (Levels 1-20): Common properties and selectors
        basic: [
            '.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}',
            '.btn {\n  padding: 10px 20px;\n  background: blue;\n}',
            'h1 {\n  font-size: 2rem;\n  color: #333;\n}',
            '.card {\n  border: 1px solid #ccc;\n  border-radius: 8px;\n}',
            'a {\n  text-decoration: none;\n  color: inherit;\n}',
            '.grid {\n  display: grid;\n  gap: 20px;\n}',
            '.flex {\n  display: flex;\n  justify-content: space-between;\n}',
            'body {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n}',
            '.hidden {\n  display: none;\n}',
            'img {\n  max-width: 100%;\n  height: auto;\n}',
            '.shadow {\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}',
            '.center {\n  text-align: center;\n}',
            '.active {\n  background-color: #007bff;\n  color: white;\n}',
            'ul {\n  list-style: none;\n  padding: 0;\n}',
            '.overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n}',
            ':hover {\n  opacity: 0.8;\n  cursor: pointer;\n}',
            '.transition {\n  transition: all 0.3s ease;\n}',
            '@media (max-width: 768px) {\n  .container { padding: 10px; }\n}',
            ':root {\n  --primary: #007bff;\n  --text: #333;\n}',
            '.gradient {\n  background: linear-gradient(to right, #f00, #00f);\n}'
        ],

        // INTERMEDIATE (Levels 21-26): Flexbox, Grid, animations
        intermediate: [
            '.navbar {\n  display: flex;\n  align-items: center;\n  padding: 1rem 2rem;\n}',
            '.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 2rem;\n}',
            '@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}',
            '.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.2);\n}',
            '.modal {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.5);\n}',
            '.text-clamp {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  overflow: hidden;\n}'
        ],

        // ADVANCED (Levels 29-35): CSS Grid advanced, custom properties, modern features
        advanced: [
            '.layout {\n  display: grid;\n  grid-template-areas: "header header" "sidebar main";\n  grid-template-columns: 250px 1fr;\n}',
            '@supports (display: grid) {\n  .fallback { display: grid; }\n}',
            '.smooth-scroll {\n  scroll-behavior: smooth;\n  scroll-snap-type: y mandatory;\n}',
            '@container (min-width: 400px) {\n  .card { padding: 2rem; }\n}',
            '.clip-path {\n  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);\n  background: linear-gradient(135deg, #667eea, #764ba2);\n}',
            'clamp(1rem, 2.5vw, 2rem);\n  color: hsl(200 50% 50% / 0.5);\n}',
            '@layer base, components, utilities;\n@layer base { h1 { margin: 0; } }'
        ]
    },

    javascript: {
        // BASIC (Levels 1-20): Variables, functions, arrays, objects
        basic: [
            'const name = "John";\nconst age = 25;\nconsole.log(name, age);',
            'function greet(name) {\n  return `Hello, ${name}!`;\n}',
            'const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((a, b) => a + b);',
            'const user = { name: "Alice", age: 30 };\nconsole.log(user.name);',
            'if (score > 90) {\n  grade = "A";\n}',
            'for (let i = 0; i < 10; i++) {\n  console.log(i);\n}',
            'const square = (x) => x * x;\nconsole.log(square(5));',
            'const fruits = ["apple", "banana"];\nfruits.push("orange");',
            'const isValid = age >= 18 && hasLicense;\n',
            'const total = items.map(item => item.price);\n',
            'let count = 0;\ncount++;\nconsole.log(count);',
            'const str = "hello world";\nconst upper = str.toUpperCase();',
            'const obj = { ...defaults, ...config };\n',
            'const [first, second] = array;\n',
            'try {\n  riskyOperation();\n} catch (error) { }',
            'const filtered = arr.filter(x => x > 10);\n',
            'function add(a, b = 0) {\n  return a + b;\n}',
            'const keys = Object.keys(obj);\n',
            'const found = items.find(item => item.id === 5);\n',
            'setTimeout(() => console.log("Hello"), 1000);'
        ],

        // INTERMEDIATE (Levels 21-26): Async, classes, modules
        intermediate: [
            'async function fetchData(url) {\n  const response = await fetch(url);\n  return await response.json();\n}',
            'class User {\n  constructor(name) { this.name = name; }\n  greet() { return `Hi, ${this.name}`; }\n}',
            'const promise = new Promise((resolve, reject) => {\n  resolve("Success!");\n});',
            'const users = await Promise.all(\n  ids.map(id => fetchUser(id))\n);',
            'export const config = { api: "/api" };\nexport function helper() { }',
            'const debounced = setTimeout(() => {\n  clearTimeout(timer);\n  callback();\n}, 300);'
        ],

        // ADVANCED (Levels 29-35): Closures, HOF, advanced patterns
        advanced: [
            'const debounce = (fn, delay) => {\n  let timer;\n  return (...args) => clearTimeout(timer) ||\n    (timer = setTimeout(() => fn(...args), delay));\n};',
            'const memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => cache.get(args) ??\n    cache.set(args, fn(...args)).get(args);\n};',
            'function* generator() {\n  yield 1; yield 2; yield 3;\n}\nconst iter = generator();',
            'const proxy = new Proxy(obj, {\n  get: (target, prop) => target[prop] || "default"\n});',
            'const compose = (...fns) => x =>\n  fns.reduceRight((acc, fn) => fn(acc), x);',
            'const deepClone = obj =>\n  JSON.parse(JSON.stringify(obj));',
            'class EventEmitter {\n  on(event, fn) { (this.events[event] ||= []).push(fn); }\n  emit(event, ...args) { this.events[event]?.forEach(fn => fn(...args)); }\n}'
        ]
    },

    jsx: {
        // BASIC (Levels 1-20): Simple components, props, JSX syntax
        basic: [
            'function App() {\n  return <h1>Hello World</h1>;\n}',
            'const Button = () => (\n  <button>Click me</button>\n);',
            'function Greeting({ name }) {\n  return <p>Hello, {name}!</p>;\n}',
            'const Card = ({ title, children }) => (\n  <div className="card">{title}{children}</div>\n);',
            'const [count, setCount] = useState(0);\n',
            'return (\n  <div>\n    <Header />\n    <Main />\n  </div>\n);',
            'const handleClick = () => {\n  alert("Clicked!");\n};',
            '<img src={logo} alt="Logo" />',
            '<button onClick={() => setCount(count + 1)}>\n  Count: {count}\n</button>',
            'const items = data.map(item => (\n  <li key={item.id}>{item.name}</li>\n));',
            'const List = ({ items }) => (\n  <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>\n);',
            '{isLoggedIn ? <Profile /> : <Login />}',
            'const style = { color: "red", fontSize: 16 };\n',
            '<input value={text} onChange={e => setText(e.target.value)} />',
            'useEffect(() => {\n  fetchData();\n}, []);',
            'const Profile = () => {\n  const user = useContext(UserContext);\n};',
            '<form onSubmit={handleSubmit}>\n  <input name="email" />\n</form>',
            'if (loading) return <Spinner />;\n',
            'const ref = useRef(null);\n',
            'return items.length > 0 && <List items={items} />;'
        ],

        // INTERMEDIATE (Levels 21-26): Hooks, context, form handling
        intermediate: [
            'const [state, dispatch] = useReducer(reducer, init);\ndispatch({ type: "INCREMENT" });',
            'const ThemeContext = createContext();\nconst theme = useContext(ThemeContext);',
            'useEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer);\n}, []);',
            'const memoized = useMemo(\n  () => expensiveCalculation(data),\n  [data]\n);',
            'const callback = useCallback(\n  () => doSomething(a, b),\n  [a, b]\n);',
            'const Portal = ({ children }) => (\n  createPortal(children, document.body)\n);'
        ],

        // ADVANCED (Levels 29-35): Custom hooks, HOC, advanced patterns
        advanced: [
            'function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() =>\n    JSON.parse(localStorage.getItem(key)) ?? initial);\n}',
            'const withAuth = Component => props => {\n  const { user } = useAuth();\n  return user ? <Component {...props} /> : <Login />;\n};',
            'function useFetch(url) {\n  const [data, setData] = useState(null);\n  useEffect(() => { fetch(url).then(r => r.json()).then(setData); }, [url]);\n  return data;\n}',
            'const LazyComponent = lazy(() => import("./Heavy"));\n<Suspense fallback={<Loading />}>\n  <LazyComponent />\n</Suspense>',
            'const MemoComponent = memo(({ data }) => (\n  <div>{expensiveRender(data)}</div>\n), (prev, next) => prev.data === next.data);',
            'function useDebounce(value, delay) {\n  const [debounced, set] = useState(value);\n  useEffect(() => { const t = setTimeout(() => set(value), delay);\n    return () => clearTimeout(t); }, [value, delay]);\n}',
            'const reducer = (state, action) => {\n  switch(action.type) {\n    case "ADD": return { ...state, count: state.count + 1 };\n  }\n};'
        ]
    },

    typescript: {
        // BASIC (Levels 1-20): Type annotations, interfaces, basic types
        basic: [
            'const name: string = "Alice";\nconst age: number = 25;',
            'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}',
            'interface User {\n  name: string;\n  age: number;\n}',
            'const user: User = { name: "Bob", age: 30 };\n',
            'type ID = string | number;\n',
            'const numbers: number[] = [1, 2, 3, 4];\n',
            'function add(a: number, b: number): number {\n  return a + b;\n}',
            'let value: string | null = null;\n',
            'enum Status { Active, Inactive }\n',
            'const tuple: [string, number] = ["Alice", 25];\n',
            'const obj: { name: string } = { name: "Test" };\n',
            'type Point = { x: number; y: number };\n',
            'function process(data: any): void { }\n',
            'const isValid: boolean = true;\n',
            'interface Props { title: string; onClick: () => void; }\n',
            'const arr: Array<string> = ["a", "b"];\n',
            'type Callback = (value: number) => void;\n',
            'const optional: string | undefined = undefined;\n',
            'class Person { constructor(public name: string) {} }\n',
            'const result: Promise<string> = fetchData();\n'
        ],

        // INTERMEDIATE (Levels 21-26): Generics, unions, utility types
        intermediate: [
            'function identity<T>(arg: T): T {\n  return arg;\n}',
            'interface Container<T> {\n  value: T;\n  getValue(): T;\n}',
            'type Partial<T> = { [P in keyof T]?: T[P] };\n',
            'type Response<T> = { data: T; error: string | null };\n',
            'function merge<T, U>(obj1: T, obj2: U): T & U {\n  return { ...obj1, ...obj2 };\n}',
            'const map = new Map<string, number>();\nmap.set("key", 42);'
        ],

        // ADVANCED (Levels 29-35): Advanced types, conditional types, mapped types
        advanced: [
            'type Readonly<T> = {\n  readonly [P in keyof T]: T[P];\n};',
            'type ReturnType<T> = T extends (...args: any[]) => infer R\n  ? R : never;',
            'type NonNullable<T> = T extends null | undefined\n  ? never : T;',
            'type DeepPartial<T> = {\n  [P in keyof T]?: T[P] extends object\n    ? DeepPartial<T[P]> : T[P];\n};',
            'const assert: <T>(condition: T) => asserts condition = c => {\n  if (!c) throw new Error();\n};',
            'type Awaited<T> = T extends Promise<infer U> ? U : T;\n',
            'interface Builder<T> {\n  build(): T;\n  with<K extends keyof T>(key: K, val: T[K]): this;\n}'
        ]
    },

    python: {
        // BASIC (Levels 1-20): Variables, functions, lists, dicts
        basic: [
            'name = "Alice"\nage = 25\nprint(f"Hello, {name}")',
            'def greet(name):\n    return f"Hello, {name}!"\n',
            'numbers = [1, 2, 3, 4, 5]\ntotal = sum(numbers)',
            'user = {"name": "Bob", "age": 30}\nprint(user["name"])',
            'if score > 90:\n    grade = "A"\n',
            'for i in range(10):\n    print(i)\n',
            'squares = [x**2 for x in range(5)]\n',
            'fruits = ["apple", "banana", "cherry"]\nfruits.append("date")',
            'def add(a, b=0):\n    return a + b\n',
            'try:\n    result = divide(10, 0)\nexcept ZeroDivisionError:\n    pass',
            'items = list(filter(lambda x: x > 10, arr))\n',
            'text = "hello world"\ntext_upper = text.upper()',
            'with open("file.txt", "r") as f:\n    data = f.read()\n',
            'import math\nresult = math.sqrt(16)',
            'keys = user.keys()\nvalues = user.values()',
            'unique = set([1, 2, 2, 3, 3])\n',
            'found = next((x for x in items if x.id == 5), None)\n',
            'count = len(items)\n',
            'merged = {**dict1, **dict2}\n',
            'sorted_items = sorted(items, key=lambda x: x.name)\n'
        ],

        // INTERMEDIATE (Levels 21-26): Classes, decorators, generators
        intermediate: [
            'class User:\n    def __init__(self, name):\n        self.name = name\n',
            'def decorator(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper',
            'def generator():\n    for i in range(5):\n        yield i\n',
            'with open("data.json") as f:\n    data = json.load(f)\n    process(data)',
            '@property\ndef full_name(self):\n    return f"{self.first} {self.last}"\n',
            'async def fetch_data(url):\n    async with aiohttp.get(url) as response:\n        return await response.json()'
        ],

        // ADVANCED (Levels 29-35): Metaclasses, context managers, advanced patterns
        advanced: [
            'class Meta(type):\n    def __new__(cls, name, bases, attrs):\n        return super().__new__(cls, name, bases, attrs)\n',
            'from functools import wraps\ndef memoize(func):\n    cache = {}\n    @wraps(func)\n    def wrapper(*args): return cache.setdefault(args, func(*args))\n    return wrapper',
            'class Context:\n    def __enter__(self):\n        return self\n    def __exit__(self, *args): pass',
            'from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y:int',
            'def compose(*functions):\n    return lambda x: reduce(\n        lambda v, f: f(v), reversed(functions), x)\n',
            'from typing import TypeVar, Generic\nT = TypeVar("T")\nclass Box(Generic[T]):\n    def __init__(self, value: T): self.value = value',
            'match value:\n    case {"type": "user", "id": uid}:\n        process_user(uid)\n'
        ]
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = codeSnippets;
} else {
    window.codeSnippets = codeSnippets;
}
