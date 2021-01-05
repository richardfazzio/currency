export interface Result {
  dataset: number;
  difference: number;
}

export interface ConverterError {
  message: string;
}

export interface ConverterResults {
  results?: Result[]
  error?: ConverterError
}
