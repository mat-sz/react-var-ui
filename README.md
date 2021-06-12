<h1 align="center">react-var-ui</h1>

<p align="center">
Simple React settings library.
</p>

<p align="center">
<img alt="workflow" src="https://img.shields.io/github/workflow/status/mat-sz/react-var-ui/Node.js%20CI%20(yarn)">
<a href="https://npmjs.com/package/react-var-ui">
<img alt="npm" src="https://img.shields.io/npm/v/react-var-ui">
<img alt="npm" src="https://img.shields.io/npm/dw/react-var-ui">
<img alt="NPM" src="https://img.shields.io/npm/l/react-var-ui">
</a>
</p>

React component library for variable setting and preview, inspired by iOS settings, [react-dat-gui](https://github.com/claus/react-dat-gui) and [dat.gui](https://github.com/dataarts/dat.gui).

While some code from react-dat-gui was used, this library functions in a completely different way. The codebase uses modern React code practices such as hooks and functional components. Instead of iterating over the children array, react-var-ui uses a Context. Creation of custom components is also easier.

## Example usage

```tsx
const [values, setValues] = React.useState({
  toggle: true,
  color: '#FF0000',
  select: 1
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
    </VarCategory>
  </VarUI>
);
```
