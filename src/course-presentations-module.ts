import * as fs from "fs";
import * as yargs from "yargs";
import * as papa from "papaparse";

import { CoursePresentationsCreator } from "./course-presentations-creator";
import { H5pPackage } from "./h5p-package";

/**
 * This is the yargs module for course presentations
 */

export class CoursePresentationModule implements yargs.CommandModule {
  public command = "course-presentation <input> <output>";
  public describe =
    "Converts markdown input to h5p course presentation content. ";
  public builder = (y: yargs.Argv) =>
    y
      .positional("input", { describe: "markdown input file" })
      .positional("output", {
        describe: "h5p output file inlcluding .h5p extension",
      })
      .option("l", {
        describe: "language for translations in h5p content",
        default: "en",
        type: "string",
      })
  public handler = async (argv) => {
    await this.runCoursePresentation(argv.input, argv.output, argv.l);
  }
  private async runCoursePresentation(
    htmlfile: string,
    outputfile: string,
    language: string,
  ): Promise<void> {
    console.log("Creating course presentation content type.");
    htmlfile = htmlfile.trim();
    outputfile = outputfile.trim();
    let html = fs.readFileSync(htmlfile, "utf8");
    let h5pPackage = await H5pPackage.createFromHub("H5P.CoursePresentation", language);
    let coursePresentationCreator = new CoursePresentationsCreator(
        h5pPackage,
        html,
    );
    await coursePresentationCreator.create();
    coursePresentationCreator.savePackage(outputfile);
  }
}
