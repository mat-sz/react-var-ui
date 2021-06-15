<h1 align="center">react-var-ui</h1>

<p align="center">
Simple React settings library.
</p>

<p align="center">
  <a href="https://demo.matsz.dev/react-var-ui/">
    <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshot.png" alt="Screenshot">
  </a>
</p>

<p align="center">
<img alt="workflow" src="https://img.shields.io/github/workflow/status/mat-sz/react-var-ui/CI">
<a href="https://npmjs.com/package/react-var-ui">
<img alt="npm" src="https://img.shields.io/npm/v/react-var-ui">
<img alt="npm" src="https://img.shields.io/npm/dw/react-var-ui">
<img alt="NPM" src="https://img.shields.io/npm/l/react-var-ui">
</a>
</p>

React component library for variable setting and preview, inspired by iOS settings, [react-dat-gui](https://github.com/claus/react-dat-gui) and [dat.gui](https://github.com/dataarts/dat.gui).

While some code from react-dat-gui was used, this library functions in a completely different way. The codebase uses modern React code practices such as hooks and functional components. Instead of iterating over the children array, react-var-ui uses a Context. Creation of custom components is also easier.

## Installation

Install `react-var-ui` with either npm or yarn:

```
yarn add react-var-ui
# or
npm install react-var-ui
```

Then include the CSS with:

```css
/* In your CSS/SCSS file: */
@import 'react-var-ui/dist/index.css';
```

or:

```js
// In your JS/TS file (assuming your bundler supports loading CSS files):
import 'react-var-ui/dist/index.css';
```

## Example usage

```tsx
const [values, setValues] = React.useState({
  toggle: true,
  color: '#FF0000',
  select: 1,
  slider: 0.4,
  xy: [0, 0.2],
  string: 'Hello world!'
});

return (
  <VarUI updateValues={setValues} values={values}>
    <VarCategory label="Example">
      <VarColor path="color" label="Color" />
      <VarToggle path="toggle" label="Toggle" />
      <VarSelect
        path="select"
        label="Select"
        options={[
          { key: 0, label: 'Zero' },
          { key: 1, label: 'One' }
        ]}
      />
      <VarSlider
        label="VarSlider"
        path="slider"
        min={0.2}
        max={0.8}
        step={0.1}
      />
      <VarString label="VarString" path="string" />
      <VarXY label="VarXY" path="xy" />
      <VarButton buttonLabel="VarButton" onClick={() => alert('clicked!')} />
    </VarCategory>
  </VarUI>
);
```

## Theme customization

The colors can be customized as such (provided are default values):

```css
.react-var-ui {
  /* Foreground color, used for text. */
  --react-var-ui-foreground-color: #ddd;

  /* Background color, used for category header backgrounds. */
  --react-var-ui-background-color: #11111a;

  /* Accent color, used for active parts of sliders, toggles and XY. */
  --react-var-ui-accent-color: #77f;

  /* Input background color. */
  --react-var-ui-input-background-color: #353542;

  /* Input background color (when hovered). */
  --react-var-ui-input-background-hover-color: #424253;

  /* Input background color (when pressed). Only applies to buttons. */
  --react-var-ui-input-background-pressed-color: #2b2b37;

  /* Label background color. */
  --react-var-ui-label-background-normal-color: #22222a;

  /* Label background color (when hovered). */
  --react-var-ui-label-background-hover-color: #2a2a33;

  /* Label border color. */
  --react-var-ui-label-border-color: #33333a;
}
```

## Utility components

### `<VarUI />`

This is the main component which provides a Context for other components. It is not required to use this component - other components accept `onChange` and `value` properties which provide a similar functionality.

#### required

| Property     | Description                                                         | Type                     |
| ------------ | ------------------------------------------------------------------- | ------------------------ |
| values       | A JavaScript object or array to be mutated by the input components. | object                   |
| updateValues | The function to be called whenever an update is available.          | (values: object) => void |

#### optional

| Property  | Description                                    | Type   |
| --------- | ---------------------------------------------- | ------ |
| className | Additional class names for the wrapper object. | string |

### `<VarCategory />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarCategory.png" alt="VarCategory screenshot">
</p>

Category component for grouping inputs.

#### required

| Property | Description     | Type      |
| -------- | --------------- | --------- |
| label    | Category label. | ReactNode |

## Input components

### Base properties

Most input components accept the following base properties.

Does not apply to `<VarButton />`.

#### optional

_T is component's value type._

| Property     | Description                                                                                                     | Type               |
| ------------ | --------------------------------------------------------------------------------------------------------------- | ------------------ |
| label        | Label to be shown left to the input.                                                                            | ReactNode          |
| className    | Additional class names on the wrapping div element.                                                             | string             |
| path         | Variable path in the data object.                                                                               | string             |
| value        | Current value (only used if context and path aren't available).<br>In most cases you aren't going to need this. | T                  |
| defaultValue | Default value for components that support resetting (on double click for example).                              | T                  |
| onChange     | On change event, called with the new value if provided.<br>In most cases you aren't going to need this.         | (value: T) => void |
| children     | Children. Only rendered when provided directly to the VarBase component.                                        | ReactNode          |

### `<VarAngle />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarAngle.png" alt="VarAngle screenshot">
</p>

Angle picker component. Accepts and provides numbers (radians).

_T = number_ (rad)

### `<VarBase />`

Base VarUI input component. Doesn't do anything besides displaying the label.

Used to construct other components from.

### `<VarButton />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarButton.png" alt="VarButton screenshot">
</p>

Button component.

**Does not accept any of the base component properties.**

#### required

| Property    | Description     | Type      |
| ----------- | --------------- | --------- |
| buttonLabel | Category label. | ReactNode |

#### optional

| Property | Description                        | Type       |
| -------- | ---------------------------------- | ---------- |
| onClick  | Called when the button is clicked. | () => void |

### `<VarColor />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarColor.png" alt="VarColor screenshot">
</p>

Color picker component. Returns and accepts values in form of hex color strings.

Uses [react-color](https://casesandberg.github.io/react-color/) under the hood.

_T = string_ (#XXXXXX)

#### optional

| Property | Description                                                                                                                                       | Type    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| alpha    | Should allow picking alpha values?<br>If true, the result hex code will contain extra two characters representing the alpha value, from 00 to FF. | boolean |

### `<VarSelect />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarSelect.png" alt="VarSelect screenshot">
</p>

Select component. Returns and accepts either `value` from option object or `key` when `value` is not provided.

_T = any_

#### required

| Property | Description              | Type               |
| -------- | ------------------------ | ------------------ |
| options  | Options to be displayed. | IVarSelectOption[] |

#### Interface: `IVarSelectOption`

**Required:**

| Property | Description                                                         | Type      |
| -------- | ------------------------------------------------------------------- | --------- |
| key      | Key for the option. Also used as value if `value` is not specified. | ReactText |
| label    | Option label.                                                       | string    |

**Optional:**

| Property | Description                                                                                                              | Type |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ---- |
| value    | Option value. Key will be used if not specified.<br>**Note: Will be serialized to JSON and deserialized when selected.** | any  |

### `<VarSlider />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarSlider.png" alt="VarSlider screenshot">
</p>

Integer/float slider component. Accepts and provides numbers.

_T = number_

#### required

| Property | Description    | Type   |
| -------- | -------------- | ------ |
| min      | Minimum value. | number |
| max      | Maximum value. | number |
| step     | Step.          | number |

#### optional

| Property    | Description                                                                | Type    |
| ----------- | -------------------------------------------------------------------------- | ------- |
| integer     | Should the end result be rounded to an integer value.                      | boolean |
| showInput   | If true will display an editable input, otherwise shows a read only value. | boolean |
| showButtons | If true will display buttons that increase and decrease the value by step. | boolean |

### `<VarString />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarString.png" alt="VarString screenshot">
</p>

String input component. Accepts and provides a string value.

_T = string_

#### optional

| Property  | Description                     | Type    |
| --------- | ------------------------------- | ------- |
| maxLength | Maximum length of the text.     | number  |
| multiline | Should the field be a textarea? | boolean |

### `<VarToggle />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarToggle.png" alt="VarToggle screenshot">
</p>

Checkbox/toggle component. Accepts and returns a boolean (true/false).

_T = boolean_

### `<VarXY />`

<p align="center">
  <img src="https://raw.githubusercontent.com/mat-sz/react-var-ui/main/screenshots/VarXY.png" alt="VarXY screenshot">
</p>

XY offset picker. Accepts and provides an array in form of [x, y].

_T = [number (x), number (y)]_

#### optional

| Property | Description    | Type                     |
| -------- | -------------- | ------------------------ |
| min      | Minimum value. | [number (x), number (y)] |
| max      | Maximum value. | [number (x), number (y)] |
| step     | Step.          | [number (x), number (y)] |
