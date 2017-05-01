export class MyProfileFormData {
  constructor(
    public username: string,
    public location: string,
    public company: string,
    public event: string,
    public interest?: string
  ) { }
}
