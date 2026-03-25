import { test } from "@playwright/test";

type StepNameBuilder<TArgs extends unknown[]> = (...args: TArgs) => string;

export function step<TArgs extends unknown[]>(
  stepNameOrFn?: string | StepNameBuilder<TArgs>,
) {
  return function decorator<TThis, TReturn>(
    target: (this: TThis, ...args: TArgs) => Promise<TReturn> | TReturn,
    context: ClassMethodDecoratorContext<
      TThis,
      (this: TThis, ...args: TArgs) => Promise<TReturn> | TReturn
    >,
  ) {
    return async function replacementMethod(
      this: TThis,
      ...args: TArgs
    ): Promise<TReturn> {
      const defaultStepName = `${this?.constructor?.name ?? "UnknownClass"}.${String(context.name)}`;

      const stepName =
        typeof stepNameOrFn === "function"
          ? stepNameOrFn(...args)
          : (stepNameOrFn ?? defaultStepName);

      return await test.step(stepName, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
