export class H5pCoursePresentationSlide {
  public elements: {
    x: number;
    y: number;
    width: number;
    height: number;
    action: {
      library: string;
      params: {
        text: string;
      };
      metadata: {
        contentType: string;
        license: string;
        title: string;
      };
    };
    alwaysDisplayComments: boolean;
    backgroundOpacity: number;
    displayAsButton: boolean;
    invisible: boolean;
    solution: string;
    buttonSize: string;
    goToSlideType: string;
  }[];
}
