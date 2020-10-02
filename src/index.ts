#!usr/bin/env node

import * as yargs from "yargs";
import { CoursePresentationModule } from "./course-presentations-module";
import { DialogCardsModule } from "./dialogcards-module";
import { FlashcardsModule } from "./flashcards-module";

try {
  yargs
    .command(new FlashcardsModule())
    .command(new DialogCardsModule())
    .command(new CoursePresentationModule())
    .help().argv;
} catch (error) {
  console.error(error);
}
