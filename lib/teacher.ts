export function isTeacher(email?: string | null) {
  const teacher = process.env.NEXT_PUBLIC_TEACHER_ID as string;
  const teacher2 = process.env.NEXT_PUBLIC_TEACHER_ID_2 as string;

  return email === teacher || email === teacher2;
}
