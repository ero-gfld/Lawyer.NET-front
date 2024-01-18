import LawyerResultModel from "@/models/LawyerSearchModel";

export type LawyerSearchResult = {
  results: LawyerResultModel[];
  totalCount: number;
  totalPages: number;
  page: number;
};

export default LawyerSearchResult;
