# TECH DECISIONS

## CLIENT SIDE RENDERING (CSR) or SERVER-SIDE RENDERING(SSR)

CSR with Plain React or SSR with Framework, like Next.js?

CSR:
used to build SPAS
ALL HTML is rendered on client, but this means all of the js needs to be downloaded before apps initialization; bad for performance.
A good use case: apps that are used internally, as tools inside companies. This is the case with our company so lets stick with vanilla JS

SSR:
Used to build multi page apps (MPA)
SOME HTML is rendered in the server.
Better Perfoemance as less js neds to be downloaded at once.
React Teams is moving increasignly more in this direction.

## TECH STACK

ROUTING---> React Router

STYLING---> styled components... very populat way of writing component-scoped CSS right inside JS.(used at IMDB, Spotify, CoinBase, and many others)

Remote State Management---> React Query.... best way of managing remote state, with features like caching, auto re-fetching ,pre-fetching, offline support, and many more... there are others like SWR and RTK Query but lets stick with this one

UI State Management--->Context API.... not a lof it so lets stick with this

Form Management---> React Hook Form.... handling bigger forms can be a lot of work, such as manual state creatino and error handling; this makes our life a lot easier

OTHER TOOLS--->React Icons/ React Hot Toast/ Recharts/ date-fns/ Supabase

# STYLED COMPONENTS

## INTRO TO STYLED COMPONENTS

the way it works is we take a regular html element, and we take the style function and create a brand new React component with some css styles applied to it. This allows us to use and reuse the element and not use the html element. High reusability!

Also these have access to ALL of the same properties that the actual HTML elements do... like alrt and onClick, before if we created our own button component, we would have to accept onClick as a prop then push it to the actual html element inside that reusable Button component... but now no need!

Of course if we want to reuse these Styled Components though we should still move components into seperate files in the ui folder.

In VS CODE, all we do is install it via npm then install the vscode styled components extension

lets say we have an h1 element we want to style.
YES! we use template literals.
Remember, its technically a component, which means we name it starting with an uppercase.
This CSS is only scoped to that exact component, in this case H1.

const H1=styled.h1`
font-size: 30px;
font-weight:600;`

Now we can reuse this anywhere:

function App(){
return(

<div>
<H1>The Wild Oasis</H1>
</div>)
}

What if we want to style a component if our style is already a component?... all we have to do is to style the div that surrounds the whole desired component

const StyledApp= styled.div`
{RULES}`
convention is to call it StyledApp

function App(){
return(
<StyledApp>
{MORE JSX}
</StyledApp>
)
}

## GLOBAL STYLES WITH THE STYLED COMPONENTS LIBRARY

so well create a new javascript file called GlobalStyles then use the createGlobalStyle function to create styles that apply to component globally....

const GlobalStyles=createGlobalStyle`{CSS RULES}`

Now we go to the component we want to accept this and make it thes sibling of any StyledApp (of course well now need ot use a react fragment)

function App() {
return (
<>
<GlobalStyles />
<StyledApp>
{JSX CODE}
</StyledApp>
</>
);
}

We can also use any variables decalared in this global styles elsewhere in our app like this now...
lets say we have a variable like this:
--color-brand-50: #eef2ff;

now in a styled component anywhere we can have this:
const H1=styled.h1`
font-size: 30px;
color:var(--color-brand-50);`

These are called design tokens.

Styled Components have their own way of implementing resubale declarations into components called "Themes" but this was before native CSS had variables, so lets just use native CSS

As for pseudo classes and pseudo elements they work just like SASS,
we use &:hover{
{RULES}
}
we do this inside the element we want to effect the hover class of.

## STYLED COMPONENTS PROPS AND THE "css" FUNCTION.

The css function is a helper function that generates css from a tempalte literal with interpolations.
Interpolations: in this case it means when we are inserting one template literal into another.... in this case well need to use the css helper function on the template literal we place to insert into another.

We can also use Props in these style components....

<H1 type="h1">
Hello World
</H1>

if we go into the ui file where we keep our heading we can conditionally check for the type...

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
font-size: 30px;
font-weight: 600;
`}

${(props) =>
props.type === "h2" &&
css`  font-size: 2rem;
      font-weight: 600;`}
line-height:1.4;
`;

this is the syntax for accepting props and notice since we are using a tempalte literal inside a template literal we are usin fhte css function

there is only only problem... our element is showing up in the dev tools as an h1 even if its visually not and has the prop type of h2 because we styled the element on the basis of h1..notice...
const Heading = styled.h1`
${(props) =>....{THE REST}}

So.... we can pass a special prop called as to our components to tell it what element is should be rendered as.
So instead lets change everything to "as", since this come withthe added benefit of also declaring what html element it will be rendered as semantically.

<H1 as="h1">
Hello World
</H1>

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
font-size: 30px;
font-weight: 600;
`}

# default props

{(props) =>
props.as === "h2" &&
css`  font-size: 2rem;
      font-weight: 600;`}
line-height:1.4;
`

**ON REACT WE CAN HAVE DEFAULT PROPS LIKE THIS**
Heading.defaultProps={
type: "h1"
}

## HOW TO STYLE 3rd PARTY LIBRARIES WITH STYLED COMPONENTS, LIKE REACT ROUTER'S LINK COMPONENT

easy!
instead of styling like this:
const Heading = styled.h1`font-size: 30px;
font-weight: 600;`

we can pass an arguement into styled like its a function
const StyledNavLink=styled(NavLink)`{RULES}`

# SUPABASE

## SUPABASE INTRO

its a service that allows developers to easily create a backend with a Postgres database.
Automatically creates a database and API so we can easily request and recieve data from the server.
No back-end development needed.
Its more than just an API!.... comes with user authentication and file storage to!

A (perhaps better) alternative to google's Firebase.

## Modeling Application State

State "Domains"/"Slices"
Well need state slices for bookings, cabins, and guests
settings sliec can control app settings
user slice can control authentication state
bookings can also control dashboard and checkin+checkout

Lets call them data tables for now on bc this is more line line with database design.

Bookings are about a guest renting a cabin... so booking needs info about WHAT gues is booking WHICH cabin; we need to connect them.
Supabase uses Postgres DB, which is SQL (relational DB). So we join tables using "foreign keys"
we are going to take the guests id and then also the cabins id inside the booking field as "foreign keys" inside booking as guestId and cabinId...booking also has its own id but this is NOT a foreign key.

## Connecting Supabase with our React App

Supabase actually provides us a custom docs on how to do this very easily.

# REACT QUERY

## intro

powerful library for managing remote (server) state
many features that allow us to write a lot less code, while also making the UX a lot better.

All data is stored in cache... which means that recieved data is stored in a cache so that it can be reused if necessary, like memoization
-This conserves data, and makes UX super responsive.
-Automatic loading and error states.
-Automatic re-fetching to keep state synced.
-Pre-fetch data we now will be necessary later(pagination is a common example of this)
-Easy remote state mutation (updating)
-Offline Support bc data is already cached locally.

React Query is necessary bc remote state is fundamentaly differnt than regular UI state.
Other libraries do some of the things that React Query does, but none of them work as well and are as popular as React Query.

## setting React Query up

first we create a place where the data lives and then provide that to the application.
Setting up the cache and the query client we do:
const queryClient=new QueryClient({
defaultOptions:{
queries:{
staleTime:60\*1000,
}
}
})

Into this we can pass options like staleTime... more on these options later.

Now we can provide this to the entire application, similar to many providers with third party libraries
<QueryClientProvider client={queryClient}>
<GlobalStyles/>
<BrowserRouter>
ROUTES
</BrowserRouter>
</QueryClientProvider>

React Query Also have DevTools, which we can include as the first child of the <QueryClientProvider>, in this case it would go just above <GlobalStles/>

## FETCHING CABIN DATA

const {
isLoading,
data: cabins,
error,
} = useQuery({
queryKey: ["cabin"],
queryFn: getCabins,
});

this useQuery custom hook is one of the most important things in React Query

this query hook takes two arguements:
a query key and a query function
the query key must be an array, its what we will see inside the dev tools.... we can think ab it like useEffects dependency array in the sense that if any of these change/get invalidated all the data with this key will then get revalidated and thus gets refetched.
Its will uniqurly identify the data we will query here.
If we later query again on another page with this exact key, it will be read from the cache, remember.

Query function:
function that is responsible for actually querying. it must return a promise, in the above case we have an abstracted function in a differnt file.... the function below

export async function getCabins() {
const { data, error } = await supabase.from("cabins").select("\*");

if (error) {
console.error(error);
throw new Error("Cabins could not be loaded");
}
return data;
}

remember we created this function with code from the Supabase API

This useQuery returns A BUNCH.... a HUGE OBJECT... we can destructure this down into many things, above we destructured it into isLoading, data, and error.

## MUTAING A CABIN

this is the deleting function in our services folder we will make with the help of supabase

export async function deleteCabin(id) {
const { data, error } = await supabase.from("cabins").delete().eq("id", id);

if (error) {
console.error(error);
throw new Error("Cabins could not be deleted");
}

return data;
}

remember--> to actually do something we have to go into SupaBase and change RLS Security Policies.

const { isLoading, mutate } =useMutation({
mutationFn: (id) => deleteCabin(id),
});

with useMutation we pass in an object with the first peroperty as the mutation function.
This returns another big object which we can destructure.
Importantly we can desturcutre the mutate (which is a function) which we can connect with a button to delete (mutate) and pass in the cabinId we got out of the cabin object previously

Hmmm.... this works (we can see this if we refresh the page)... but the UI doesnt automiactlly update...
we can add the onSeucess property to the useMutation object which will trigger the listed callback functino upon success
lets invalidate the cache once its successful so the cache gets revalidated.
How do we get access to our queryClient instance-->useQueryClient...

const queryClient = useQueryClient();

const { isLoading: isDeleting, mutate } = useMutation({
mutationFn: (id) => deleteCabin(id),
onSuccess: () => {
queryClient.invalidateQueries({
queryKey: ["cabins"],
});
},
onError: (err) => alert(err.message),
});

See this query key, this is why it was important that each queryKey is uniquely identified; so we can invalidate that query and force it to revalidate

You can also see we also have onError, which gets access to the error thrown back in the mutation function (yes the one that is declared in the mutationFn).
Whenever there is an error, React Query will try to refetch a couple of times.

# DISPLAYING TOASTS (Notifications)

in web design notifications are called Toasts, lets use react-hot-toast.

Yes, we have to go back to App.jsx and add another self-closing provider.
If you want to see the specifics of what all this means (and btw yes we can use variables in its declarations) go to its docs
<Toaster
position="top-center"
gutter={12}
containerStyle={{ margin: "8px" }}
toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
/>

# INTRODUCTING ANOTHER LIBRARY: REACT HOOK FORM

## React Hook Form

Step1).REGISTER ALL THE INPUT FORMS WE WANT REACT HOOK FORM TO HANDLE
const { register, handleSubmit } = useForm();

call the useEffect custom hook and destructure it.

register and handleSubmit are two of the most important REACT HOOK FORM components.
Now on an element input we spread the registerd value and call it with the arguement of the input's id.

Register will allow React HOok Form to track each inputs values, validations, and errors
<FormRow>
<Label htmlFor="description">Description for website</Label>
<Textarea
type="number"
id="description"
defaultValue=""
{...register("description")}
/>
</FormRow>

2). we place the handleSubmit on the encompassing Form component

<Form onSubmit={handleSubmit(onSubmit)}>
<FormRow>
<Label htmlFor="name">Cabin name</Label>
<Input type="text" id="name" {...register("name")} />
</FormRow>
</Form>

We call this handleSubmit with an arguement--->a function we declare somewhere else in the component.

We can make reguister more complex by adding some validators and handling form errors...but later...

# SOME INTERACTIONS IN OUR APP WITH ALL LIBRARIES

## Creating a New Cabin

once again well edit security policies and get the code for adding all in SupaBase.
Then we use it to create a function in our services folder:

export async function createCabin(newCabin) {
const { data, error } = await supabase.from("cabins").insert([newCabin]);

if (error) {
console.error(error);
throw new Error("Cabins could not be deleted");
}

return data;
}

**Now all we want to do in the onSubmit function previoiusly mentioned is mutate(destuctured from useMutation) the data**
const { register, handleSubmit, reset } = useForm();
const queryClient = useQueryClient();

const { mutate, isLoading: isCreating } = useMutation({
mutationFn: createCabin,
onSuccess: () => {
toast.success("New cabin successfully created");
queryClient.invalidateQueries({ queryKey: ["cabins"] });
reset();
},
onError: (err) => toast.error(err.message),
});

function onSubmit(data) {
mutate(data);
}

Also from useForm, we can destucture reset out which will reset the form inputs upon being called.

## HANDLING FORM ERRORS

ADding on to what we did before we can have the required notification be a custom error by adding on to what we did previously like so

<Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required." })}
        />
      </FormRow>
</Form>

Now once the form is submitted handleSubmit will get executed and verify all input info, if it all looks good onSubmit will be executed... if not then onError will be executed.

We can go even further than this....
we can check for min value, and many other things....
<Input
type="number"
id="maxCapacity"
{...register("maxCapacity", {
required: "This field is required.",
min: {
value: 1,
message: "Capacity Should Be 1 at Minimum.",
},
})}
/>

How would we make sure that discount is less than regularPrice?... remember useForm, it gives us an object of all values in our form called getValues
const { register, handleSubmit, reset, getValues } = useForm();

        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />

With validate we can call any custom function. Here if regularPrice is less than the discount the string will get returned.

Ok so how do we get these messages and such into our app...
another things we can destructure from useFOrm....
const { register, handleSubmit, reset, getValues, formState } = useForm();
const {errors}=formState

Now we can stick these errors in our Forms via optional chaining...

<Form onSubmit={handleSubmit(onSubmit)}>
<FormRow>
<Label htmlFor="name">Cabin name</Label>
<Input
type="text"
id="name"
{...register("name", {
required: "This field is required.",
})}
/>
{errors?.name?.message && <Error>{errors.name.message}</Error>}
</FormRow>

Ok but we basically have the same code 5 times for each label/input... so lets obey the DRY priunciple and abstract into a form row component.

function FormRow({ label, error, children }) {
return (
<StyledFormRow>
{label && <Label htmlFor={children.props.id}>{label}</Label>}
{children}
{error && <Error>{error}</Error>}
</StyledFormRow>
);
}

and in our createCabinFOrm component well have this to pass into children

<Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required.",
          })}
        />
      </FormRow>
  </Form>

In the FormRow Comonent notice we can call children.props.id.... this is because "children" have access to all props of their literal children. SO in our caase they have acess to the id prop.

## Handling Image Uploads and Uploading them to Supabase

Aside: if we know every instance of a Styled Component is going to have a non-styled attribute... intead of writing it over and over again we can actually just write it once in the Styled COmponent like so:

const FileInput = styled.input.attrs({ type: "file" })`

## Editing Cabins

A lot of this is just applying things weve already learned but there are some interesting tech in this lecture....

const { mutate: editCabin, isLoading: isEditing } = useMutation({
mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
onSuccess: () => {
toast.success("Cabin successfully edited.");
queryClient.invalidateQueries({ queryKey: ["cabins"] });
reset();
},
onError: (err) => toast.error(err.message),
});

So for mutationFn, we pass these arguements as an objeect bc for whatever reason mutationFn can only take a callback function with one arguement.

## Abstracting React Query into Custom Hooks

const queryClient = useQueryClient();

const { mutate, isLoading: isCreating } = useMutation({
mutationFn: createEditCabin,
onSuccess: () => {
toast.success("New cabin successfully created");
queryClient.invalidateQueries({ queryKey: ["cabins"] });
reset();
},
onError: (err) => toast.error(err.message),
});

So the problem is we dont have access to thsi React Form component reset()... so how do we reset fields then... well they have thought of this...
we can also use onSuccess where the mutation literally happens and then call reset() there

## Duplicating Cabins

nothing new here

## Fetching Application Settings

there is one interesgint thing to note in this lecture...
function UpdateSettingsForm() {
const {
isLoading,
settings: {
minBookingLength,
maxBookingLength,
maxGuestsPerBooking,
breakfastPrice,
} = {},
} = useSettings();

So we get an undefined typeError here bc were trying to use this data but it does not exist yet... so we can do a hack where we set the setting to an empty object initially and then well populate and then get all the listed settings from said empty object.

## Updating Application Settings

ok so we want it so that whenever we leave an input field that input field automatically updates the setting... very common in applications.
Well use useBlur for this in the input.
It works like so

function handleUpdate(e, field) {
const { value } = e.target;
if (!value) return;
updateSetting({ [field]: value });
}

return (

<Form>
<FormRow label="Minimum nights/booking">
<Input
type="number"
id="min-nights"
defaultValue={minBookingLength}
disabled={isUpdating}
onBlur={(e) => handleUpdate(e, "minBookingLength")}
/>
</FormRow>
</Form>)

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

<!-- MAKING A SEPERATE FILE FOR THE ADVANCED REACT PATTERNS SECTION -->

## BUILDING A MODAL WINDOW USING A REACT PORTAL

A react portal is a feature that allows to render an element otuside the parent component dom structure while still keeping the element in the roginal position in the Component tree.
So the portal allows us to render the component in any place we want inside the DOM tree but we can keep it in the same place in the react component tree, so things like props keep working normally.
This generally works for things we want to keep on top of other things, like modals and tool tips.
It is not provided by React but by React DOM

How it works:
on the element we want to always be on top, we return the result of createPortal instead of the JSX. AS its first arguement it recieves the jsx, and as the second it recieves the dom node in which we want to render this jsx.

function Modal({ children, onClose }) {
return createPortal(
<Overlay>
<StyledModal>
<Button onClick={onClose}>
<HiXMark />
</Button>

<div>{children}</div>
</StyledModal>
</Overlay>,
document.body

);
}

Now this modal window is a direct child of the body element ( we selectd this as the parent element above)
If we look at the component tree, we can see that the modal is at the same exact place which is why we can still work with props normally, even though in the DOM its not actually in that position.

The main reason the portal is used is actually to avoid conflicts with the css property overflow: hidden.
Many times we make a modal that works fine, but in other places if it is used it can get cut off in a component and the hidden property will cause it to be really cut off.
This ensures it will never be cut off because of the position we put it in, it cannot have a parent that has overflow:hidden,( welll in this case it can but that would have to be the body.)

## CONVERTING MODAL TO A COMPOUND COMPONENT

we have to do this because it is currently unideal in how we render it and its staeful logic.

function AddCabin() {
const [isOpenModal, setIsOpenModal] = useState(false);

return (

<div>
<Button onClick={() => setIsOpenModal((show) => !show)}>
Add New Cabin
</Button>
{isOpenModal && (
<Modal onClose={() => setIsOpenModal(false)}>
<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
</Modal>
)}
</div>
);
}

We currently conidiontally render it based on isOpenModal... we dont want the component that uses the modal to keep track of it...the modal component iself should know... it should be kept internally. We also want configuration on said modal.

Ok, so here is our compound component bare bones API

function AddCabin() {
return (
<Modal>
<Modal.Open>
<Button>Add New Cabin</Button>
</Modal.Open>
<Modal.Window>
<CreateCabinForm />
</Modal.Window>

      <Modal.Open>
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>

);
}

Modal.Open should know which component is currently open bc only one should be open a t a time....

function AddCabin() {
return (
<Modal>
<Modal.Open opens="cabin-form">
<Button>Add New Cabin</Button>
</Modal.Open>
<Modal.Window name="cabin-form">
<CreateCabinForm />
</Modal.Window>

      <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>

);
}

Done!

Ok so lets go over to our Modal File and check out what we have so far for our compount component

const ModalContext = createContext();

function Modal({ children }) {
const [openName, setOpenName] = useState("");

const close = () => setOpenName("");
const open = setOpenName;
}

function Open({ children, opens }) {
const { open } = useContext(ModalContext);

return children;
}

function Window({ children, onClose }) {
return createPortal(
<Overlay>
<StyledModal>
<Button onClick={onClose}>
<HiXMark />
</Button>

        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body

);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

So we have a problem..... with Open, we want to add the open event handler to the Button component, however it has no acess to the internal state of Modal.
In essence we want to try to add the {open} prop to the returned children in the Open function... solution--> React's clone element function.

This allows us to create an element based off of some passed in arguements...
element, props, ...children
So now the Open function will look like this:

function Open({ children, opens: opensWindowName }) {
const { open } = useContext(ModalContext);

return cloneElement(children, { onClick: () => open(opensWindowName) });
}

So in essence: since we cannot put that eventHandler function directly on the Button ,what we do is clone it and pass the onClick prop and then the open event handler function, so now we can check on the Modal.Window which is the currently open window and render content based on which window it is, lets implement this code:

## DETECTING A CLICK OUTSIDE THE MODAL

Ok so now lets go back to a more primitive way of DOM traversion...

function Window({ children, name }) {
const { openName, close } = useContext(ModalContext);
const ref = useRef();

useEffect(
function () {
function handleClick(e) {
if (ref.current && !ref.current.contains(e.target)) close();
}
document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick, true);
    },
    [close]

);

if (name !== openName) return null;

return createPortal(
<Overlay>
<StyledModal ref={ref}>
...........{MORE JSX}...............
);
}

So were going back to global addEventListener here... of course we do all this inside a useEffect....
We delegate functionality to handleClick so that we can then remove this in the cleanup (return) function as the component unmounts

We want something to happen when the click event happens anywhere outside the styled modal so well use a ref on the StyledModal for this.
if the ref exists (ref.current) and it does not cointain the target (!ref.current.contains(e.target)), in this case the modal (so the click doesnt happen on the modal) we'll close it.

**Ok great it works... but if we try to open it again nothing seems to happen....**

look at this line:return () => document.removeEventListener("click" handleClick, true);
in this cleanup function
true means it gets handled in the capturing phase rather than the bubbing phase (the default)
Right now, when we click on the add cabin button, there will now be a ref value... this click on the button's event will bubble up all the way to the dom and when it raches the modal window it will detect a click outside of it which will essentially cause the modal window to open and close faster than we can even notice.
So lets change it so that we dont listen to these events on the bubbling phase and instead do it on the capturing phase.... this is the third arguement being set to true that was already metnioend a couple of lines up.

## PREFETCHING W REACT QUERY

prefetching = fetching data before we need it so when we actually need it and try to load, its already loaded and displays seemlessly with 0 load time, good use case is pagination.
Typically in prefetching w pagination well prefetch the next and previous page.
It works very similarly to use query... look at the syntax

const pageCount = Math.ceil(count / PAGE_SIZE);
if (page < pageCount)
queryClient.prefetchQuery({
queryKey: ["bookings", filter, sortBy, page + 1],
queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
});

if (page > 1)
queryClient.prefetchQuery({
queryKey: ["bookings", filter, sortBy, page - 1],
queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
});

Now we are prefetching the next page and previous page.
Just make sure we account for cases where there would not be a next page....

An alternative to prefetching and pagination in the first place is an infinite scroll feature, which reactQuery has--> check out its docs.

## BUILDING THE SINGLE BOOKING PAGE

remember: a page SHOULD NOT FETCH DATA OR HAVE ANY OTHER SIDE EFFECTS... this makes the pages feature cleaner and leaves development work to the features folder

## AUTHORIZATION: PROTECTING ROUTES

So as we can see, every route is a child of the AppLayout ROute....

function App() {
return (
<QueryClientProvider client={queryClient}>
<ReactQueryDevtools initialIsOpen={false} />
<GlobalStyles />
<BrowserRouter>
<Routes>
<Route element={<AppLayout />}>
<Route index element={<Navigate replace to="dashboard" />} />
<Route path="dashboard" element={<Dashboard />} />
<Route path="bookings" element={<Bookings />} />
<Route path="bookings/:bookingId" element={<Booking />} />
<Route path="checkin/:bookingId" element={<Checkin />} />
<Route path="cabins" element={<Cabins />} />
<Route path="users" element={<Users />} />
<Route path="settings" element={<Settings />} />
<Route path="account" element={<Account />} />
</Route>
<Route path="login" element={<Login />} />
<Route path="\*" element={<PageNotFound />} />
</Routes>
</BrowserRouter>

So what we are going to do is wrap the App Layout itself into the Protected Route Component... so what this will do is that all children routes can only be accessed if applayout determines that there is a currently logged in user.... so lets go make a ProtectedRoutes.jsx in our ui folder...

Now our app looks like this...
<BrowserRouter>
<Routes>
<Route
element={
<ProtectedRoute>
<AppLayout />
</ProtectedRoute>
} >
<Route index element={<Navigate replace to="dashboard" />} />
<Route path="dashboard" element={<Dashboard />

This is what our ProtectedRoute looks like...

function ProtectedRoute({ children }) {
const navigate = useNavigate();

// Load the authenticated user
const { isAuthenticated, isLoading } = useUser();

// if no authenticated user, redirect to /login
useEffect(
function () {
if (!isAuthenticated && !isLoading) navigate("/login");
},
[isAuthenticated, isLoading, navigate]
);

// while loading, show a spinner
if (isLoading)
return (
<FullPage>
<Spinner />
</FullPage>
);

// if there is a user, render the app

if (isAuthenticated) return children;
}

export default ProtectedRoute;

One moer thing... we can add data to our cache like this witht the " queryClient.setQueryData(["user"], user);
" line....

export function useLogin() {
const queryClient = useQueryClient();
const navigate = useNavigate();

const { mutate: login, isLoading: isLoggingIn } = useMutation({
mutationFn: ({ email, password }) => loginApi({ email, password }),
onSuccess: (user) => {
queryClient.setQueryData(["user"], user);
navigate("/dashboard");
},
onError: () => toast.error("Provided Email or Password are Incorrect."),
});

return { login, isLoggingIn };
}

# REACT ERROR BOUNDARIES LIBRARY

using error boundaries with vanilla javascript is quite difficult so p much everybody uses this library.
We want to avoid the blank white pages upon errors.
What thsi library does is give us an error boundary component where we can pass in a callback and also a function to reset the application

THey ONLY CATCH RENDERING ERRORS.... so no errors in async code, or in effects will be caught... but we often in those cases have some other mechanism to catch errors like onError in reactQuery or something...

To use it lets go to Main.jsx (not App.jsx, where the routes are implemented) and implement...

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<ErrorBoundary
onReset={() => window.location.replace("/")}
FallbackComponent={<ErrorFallback />} >
<App />
</ErrorBoundary>
</React.StrictMode>
);

And this is what the ErrorFallback page in our ui will look like... it is technically outside the app so once again we have to provide the global styles

function ErrorFallback({ error, resetErrorBoundary }) {
return (
<>
<GlobalStyles />
<StyledErrorFallback>
<Box>
<Heading as="h1">Something went wrong 😫</Heading>

<p>{error.message}</p>
<Button onClick={resetErrorBoundary} size="large">
Reload Application
</Button>
</Box>
</StyledErrorFallback>
</>
);
}

## ONE LAST THING: CHECK IF USER HAS DARK MODE IN BROWSER BY DEFAULT...

before we set dark mode to false by default...however we can check if they have dark mode on as a browser setting by default and use dark mode if so with this line of code in our dark mode context file...
const [isDarkMode, setIsDarkMode] = useLocalStorageState(
window.matchMedia("(prefers-color-scheme:dark)").matches,
"isDarkMode"
);

before instead of " window.matchMedia("(prefers-color-scheme:dark)").matches" we just had "false"

# DEPLOYMENT

## DEPLOYING TO NETLIFY

so first we run the build command which will get us the dist folder... now we can add a netlify.toml file to that
and all we do in that file is add this code...

[[redirects]]
from = "/\*"
to = "/index.html"
status=200

Ok, so now we can go to netlify, build a new site and drop this dist folder into the upload bin.

Done! now if you want you change change your name...

However if we want continuous integration we need to upload our code to git and upload through something like Vercel

## UPLOADING TO GIT

lets assume you have git installed on your computer.

ok so to transform your folder into a hit respoitory all you have to do is "git init" in your folder's terminal
A repository is a special folder that will change every change you do to every file in said repository.
Git is deeply integrated into VS code thankfully.

In git we can have multiple branches, where different versions of our code can live in differnt branches.
We can easily switch back and forth between them.

Before we add our files to our "staging area" lets add a file called readme.md

to check that status of your staging area and see what files are in them you can do "git status"

to add all files you can do "git add -A"
Now all files are added/tracked
if now we change any file it will show up with an "M" next to the file name showing it has been modified.
If we wanted to add this now modified file we would have to add it again via "git add"

Ok so now lets save a snapshot of the repository as it exists in this current moment... in github this is called a commit...
git commit -m "initial Commit"
This -m allows you to add a messsage for this specific commit.
So now this clears our "working tree" and all the A, M, and Us next to our files disappear bc the snapshot has been safely commited to github.

### creating a remote repository on github and connecting it to our local one

Ok so now this local snapshot has been commited lets go on github to create a repostiory which exists as a cloud repository pretty much... the idea is we will connect this two to make local and cloud communication very easy...

on github before we go any further lets set up an "access token", which well use instead of a password to connect the cloud and local repostiories.

Ok so well go into githubs developer settings, and create a token (in the personal access tokens section), set the expiration for the token to 90 days and give it scope of the entire repo (so check repo)

Now store this token somewhere very very safe... treat it like a password because it kinda is

Now well go to github and type this command:
git remote add origin {github repostiory url}

Now our local repostiory knows about this remote repository
Now lets "push" our local repostiory to our remote repository...
git push -u (the name of the remote one) (the name of our local branch we want to push to the remote one)

-U means were pushing upstream

in our case the line is: git push -u origin main

Now you can go to github and you will see your files on github

Whenever in the termiinal you are asked for your email and password you can put your email and this access token we mentioned.

Vite automaitacllly gave us a gitignore than will ignore the dist folder nad node_modules because it is very very easy to recompute them, so no need to spend the storage pushing them

### whenever we want to update our repostirory with updates via vs code

Now lets make some change and have that reflect in our remote repository...
We first must add it to our staging area

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
