import type { Subject } from "../types";

export function subjectSkillLabel(subject: Subject): string {
  switch (subject) {
    case "math":
      return "math skill";
    case "reading":
      return "reading skill";
    case "gifted":
      return "Brain Games puzzle type";
  }
}
