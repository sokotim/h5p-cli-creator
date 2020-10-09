import { parse } from "node-html-parser";
import { ContentCreator } from "./content-creator";
import { H5pPackage } from "./h5p-package";
import { H5pCoursePresentation } from "./models/h5p-course-presentation";
import { H5pCoursePresentationContent } from "./models/h5p-course-presentations-content";

export class CoursePresentationsCreator extends ContentCreator<
  H5pCoursePresentationContent
> {
  constructor(
    h5pPackage: H5pPackage,
    private slides: Array<{
      text: string;
    }>,
    private title: string,
  ) {
    super(h5pPackage);
  }

  protected contentObjectFactory(): H5pCoursePresentationContent {
    return new H5pCoursePresentationContent();
  }

  protected async addContent(
    contentObject: H5pCoursePresentationContent,
  ): Promise<void> {
    contentObject.presentation = new H5pCoursePresentation();
    contentObject.presentation.slides = new Array();
    for (const slide of this.slides ) {
        const newSlide = {
        elements: [{
            x: 10,
            y: 10,
            width: 80,
            height: 80,
            action: {
            library: "H5P.AdvancedText 1.1",
            params: {
                text: slide.text,
            },
            metadata: {
                contentType: "Text",
                license: "U",
                title: "Untitled Text",
            },
            },
            alwaysDisplayComments: false,
            backgroundOpacity: 50,
            displayAsButton: false,
            invisible: false,
            solution: "",
            buttonSize: "big",
            goToSlideType: "specified",
        }],
        };
        contentObject.presentation.slides.push(newSlide);
    }
  }
  protected addSettings(contentObject: H5pCoursePresentationContent) {
    this.h5pPackage.h5pMetadata.title = this.title;
    this.h5pPackage.addMetadata(this.h5pPackage.h5pMetadata);
  }
}
