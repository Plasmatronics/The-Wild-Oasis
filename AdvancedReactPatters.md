## AN OVERVIEW OF REUASBILITY

There are two types of code we would want to reuse: stateful logic(logic with at least one react hook), UI

UI
to reuse UI we use components and props as a sort of component API, to enable custom behavior. Can be stateless, statefull or structural components
Taking this one step further, we can pass content or other components into components with the children props

Stateful Logic
We can write our own custom hooks, which allow us to write our react hooks whci constist of at least one other hook.

More advanced...
Render Props Pattern
The user has complete control over what the component renders, by passing in a function that tells the component what to render. Was more common before hooks, but still useful
With this pattern, we can reuse logic that has UI (JSX) while givin the component to recieve even more JSX

Compound Component Pattern
We have multiple components that play together to make a super component.
This allows us to create very self-cotnained components that want to manage their own state.

## RENDER PROPS PATTERN EXAMPLES

The render prop pattern is all ab passing in a prop called "render" that tells the component what to render and how to it.

export default function App() {
return (

<div>
<h1>Render Props Demo</h1>
<div className="col-2">
<List title="Products" items={products} render={(product) => (
  <ProductItem key={product.productName} product={product}/>)}/>
</div>
</div>
);
}

Now we can go back up to List and accept the render prop

function List({ title, items, render }) {
return (

<div className="list-container">
<div className="heading">
<h2>{title}</h2>
<button onClick={toggleOpen}>
{isOpen ? <span>&or;</span> : <span>&and;</span>}
</button>
</div>
{isOpen && (
<ul className="list">
{displayItems.map(render)}
</ul>
)}
<button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
{isCollapsed ? `Show all ${items.length}` : "Show less"}
</button>
</div>
);
}

Now the List still works like it was before(normally mapping), but we inverted the control ab how we render the component.
Now that List no longer knows or cares what its rendering, it makes it very easy to use that to render a list of other components
Now lets say we wanted to reuse this List for companies instead of products.

export default function App() {
return (

<div>
<h1>Render Props Demo</h1>
<div className="col-2">
<List title="Products" items={products} render={(product) => (
  <ProductItem key={product.productName} product={product}/>)}/>
  <List title="Companies" items={companies} render={(company) => (
  <CompanyItem key={company.productName} company={company} defaultVisibility="false"/>)}/>
</div>
</div>
);
}

See now We can just reuse this extremely easily. The less specific a component the easier it is to reuse.
Usually though we can just use custom hooks for the same issues we solve with the render props pattern now

## HIGHER ORDER COMPONENT PATTERN

almost nobody writes these by hand anymore, but some library still use them, so well learn it mostly for legacy/libarry reasons.

Lets say we got this from a third party library:

function ProductList({ title, items }) {
return (

<ul className="list">
{items.map((product) => (
<ProductItem key={product.productName} product={product} />
))}
</ul>
);
}

We cant change it because its from a 3rd party library but we want to add a toggle functionality.
So wee can write a higher order component
**Higher Order COmponents** take in a component and returns a new component thats an enhanced version of the original component.
They often start "with", below we have withToggles

export default function withToggles(WrappedComponent) {
return function List(props) {
const [isOpen, setIsOpen] = useState(true);
const [isCollapsed, setIsCollapsed] = useState(false);

    const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;

    function toggleOpen() {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>
        {isOpen && <WrappedComponent {...props} items={displayItems} />}

        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
        </button>
      </div>
    );

};
}
const ProductListWithToggles=withToggles(ProductList)

TA DA!
Now we can use ProductListWithToggles with this functinality anywhere.

## COMPOUND COMPONENT PATTERN EXAMPLES

We can create a set of related components that together complete a common and useful task.
We create a parent component and then a few child component that only really make sense when used with the parent component.
Its Like the select and option html element--> option only makes sense when its a child of select.

Lets say we want a counter compound component.
<Counter>
<Counter.Decrease icon="-"/>
<Counter.Count/>
<Counter.Increase icon="+"/>
<Counter.Label>My Super Flexible Counter</Counter.Label>
</Counter.Decrease>

Now we can just adjust this counter by adding/removing these components or moving them around. We avoid a huge prop mess ENTIRELY.
Counter.{WHATEVER} are children components---> they really only make sense inside Counter.
How will any of these children components know about this parent components state?
Great use case for the contextAPI..

**So here are the full steps to creating a compound component:**
1). create a contxt

const CounterContext=createContext();

2).Creat a parent component

<!-- the children components will be passed into the children prop and will get access to all context values -->

function Counter({children}){
const [count, setCount]=useState(0)
const increase= ()=>setCount(c=>c+1)
const decrease= ()=>setCount(c=>c-1)

return(
<CounterContext.Provider value={{count, increase, decrease}}>
<span>{children}</span>
<CounterContext.Provider>
)
}

3)> create children components that help implement that common task of the parent component.
function Count(){
const {count}=useContext(CounterContext)
return <span>{count}</span>
}
And then you can add all of these children components too...
function Label(){}
function Increase(){}
function Decrease(){}

4). Add child components as properties to parent components.
Now we can just do
Counter.Count=Count
Counter.label=Label
Counter.increase=Increase
Counter.decrease=Decrease

Now these components are properties to the parent component.
This is possible bc Counter is a function and we can add properties to nearly everything in js, including functions.

ON BACK TO WILDOASISNOTES!!!
