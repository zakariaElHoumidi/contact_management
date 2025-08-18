import { AbstractControl } from "@angular/forms";

export const passwordNotMatch = (form: AbstractControl): null | { [key: string]: boolean } => {
  console.log(form.get('password')?.value);
  console.log(form.get('confirmPassword')?.value);


  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password !== confirmPassword)
    return { notEqual: true };
  else
    return null;
}
