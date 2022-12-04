type DiaryType = {
  id: number;
  date: string;
};

export type DiaryLoadListResponseType = {
  totalPage: number;
  diaryResponses: DiaryType[];
};
