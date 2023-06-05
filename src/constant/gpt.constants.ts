exports.BUDDY_MODE = {
  CODE_ERROR_SOLUTION: 0,
  CODE_EXPLANATION: 1,
  CODE_REFACTORING: 2,
};

exports.GPT_TEMPLATE = {
  CODE_ERROR_SOLUTION(code: string, description: string, stack: string) {
    return `
              The following [CODE] may contains errors or bugs. Please give <DETAILS> for errors, and <FIXED_CODE> with comments.\n
              If [CODE] has no errors or bugs, please explain about the [CODE] and write after "<DETAILS>" tag.\n\n
              [CODE]: \n
              ${code}\n\n
              [DESCRIPTION]: \n
              ${description}\n\n
              The below is rules of the answer:\n
              - Please make sure to write answer in Korean.\n
              - If there is a [DESCRIPTION], refer to it and prepare an answer. \n
              - The code follows this ${stack}. If not, look at the [CODE] and guess the stack and answer. \n
              - Must wrapped with "<DETAILS>" tag for details and must close the tag with </DETAILS>.\n
              - Must wrapped with "<FIXED_CODE>" tag for fixed code and must close the tag </FIXED_CODE>.\n
              - The <FIXED_CODE> must to be placed after <DETAILS>\n
              - The <FIXED_CODE> has only code and comments for details\n
              - Please comments code in <FIXED_CODE> about the errors\n
              - Answer can only contains <DETAILS> and <FIXED_CODE> tags\n
              - If the [CODE] is not a valid code, please answer only plain text like "invalid_code".\n\n
          `;
  },
  CODE_EXPLANATION(code: string, description: string, stack: string) {
    return `
              Please explain <DETAILS> about following [CODE]\n\n
              [CODE]: \n
              ${code}\n\n
              [DESCRIPTION]: \n
              ${description}\n\n
              The below is rules of the answer:\n
              - Please make sure to write answer in Korean.\n
              - If there is a [DESCRIPTION], refer to it and prepare an answer. \n
              - The code follows this ${stack}. If not, look at the [CODE] and guess the stack and answer. \n
              - Must wrapped with "<DETAILS>" tag for details and must close the tag with </DETAILS>.\n
              - Answer can only contains <DETAILS> tag\n
              - If the [CODE] is not a valid code, please answer only plain text like "invalid_code".\n\n
          `;
  },
  CODE_REFACTORING(code: string, description: string, stack: string) {
    console.log("template", description, stack);
    return `
              If there is something to be improved in the code. Please give <DETAILS> for improvement, and <FIXED_CODE> with comments.\n
              If [CODE] has no improvement, please explain about the [CODE] and write after "<DETAILS>" tag.\n\n
              [CODE]: \n
              ${code}\n\n
              [DESCRIPTION]: \n
              ${description}\n\n
              The below is rules of the answer:\n
              - Please make sure to write answer in Korean.\n
              - If there is a [DESCRIPTION], refer to it and prepare an answer. \n
              - The code follows this ${stack}. If not, look at the [CODE] and guess the stack and answer. \n
              - Must wrapped with "<DETAILS>" tag for details and must close the tag with </DETAILS>.\n
              - Must wrapped with "<FIXED_CODE>" tag for refactoring code and must close the tag </FIXED_CODE>.\n
              - The <FIXED_CODE> must to be placed after <DETAILS>\n
              - The <FIXED_CODE> has only code and comments for details\n
              - Please comments code in <FIXED_CODE> about improvement\n
              - Answer can only contains <DETAILS> and <FIXED_CODE> tags \n\n
          `;
  },
};
