const wrapFunction = <FN1 extends Function, FN2 extends (...args: any[]) => any>(fn1: FN1) => (fn2: FN2): FN2 => {
  return ((...args: any[]) => {
    fn1();

    return fn2(...args);
  }) as FN2;
};

export default wrapFunction;
