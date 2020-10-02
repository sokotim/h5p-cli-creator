import { ContentCreator } from "./content-creator";
import { H5pPackage } from "./h5p-package";
import { H5pCoursePresentationContent } from "./models/h5p-course-presentations-content";

export class CoursePresentationsCreator extends ContentCreator<
  H5pCoursePresentationContent
> {
  constructor(
    h5pPackage: H5pPackage,
    private data: Array<{
        text: string,
    }>,
  ) {
    super(h5pPackage);
  }

  protected contentObjectFactory(): H5pCoursePresentationContent {
    return new H5pCoursePresentationContent();
  }

  protected async addContent(
    contentObject: H5pCoursePresentationContent,
  ): Promise<void> {
    contentObject.presentation.slides = new Array();
    for (const line of this.data ) {
        const slide = {
        elements: [{
            x: 1,
            y: 1,
            width: 400,
            height: 300,
            action: {
            library: "H5P.AdvancedText 1.1",
            params: {
                text: line.text,
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
        contentObject.presentation.slides.push(slide);
    }
  }
  protected addSettings(contentObject: H5pCoursePresentationContent) {}
}
