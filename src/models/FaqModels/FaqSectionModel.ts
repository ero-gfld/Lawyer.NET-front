import FaqModel from "./FaqModel";

export type FaqSectionModel = {
  title: string;
  faqs: FaqModel[];
};

export default FaqSectionModel;
