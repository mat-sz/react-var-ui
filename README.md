# react-var-ui

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
