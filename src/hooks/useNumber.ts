import { useState } from "react";

const useNumber = (initialValue: number) => useState<number>(initialValue);

export type UseNumberValue = ReturnType<typeof useNumber>[0];
export type UseNumberSetValue = ReturnType<typeof useNumber>[1];
