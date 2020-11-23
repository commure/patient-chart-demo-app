export type HOFSmartApp = <P>(
  WrappedComponent: React.FC<P>
) => (props: P) => React.ReactElement;