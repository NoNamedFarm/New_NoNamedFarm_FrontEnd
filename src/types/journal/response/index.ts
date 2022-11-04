import { UserType } from "../../user/response";

export interface JournalType {
  content: string;
  created_date: string;
  user_id: UserType;
}
