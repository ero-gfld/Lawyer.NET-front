import LawyerSearchModel from "@/models/LawyerSearchModel";

export type LawyerSearchResult = {
  results: LawyerSearchModel[];
  totalCount: number;
  totalPages: number;
  page: number;
};

export default LawyerSearchResult;
