/*
    This file is part of OpenNotebook-Web

    OpenNotebook-Web is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    OpenNotebook-Web is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with OpenNotebook-Web.  If not, see <http://www.gnu.org/licenses/>. 
*/
MathQuill.interfaceVersion(1);

var problems = Array();

var mathQuillOpts = {
    // for intuitive navigation of fractions
    leftRightIntoCmdGoes: 'up',
    autoCommands: 'pi theta sqrt sum',
    autoSubscriptNumerals: true,
};

// assumes the assignment-container div is empty, adds the html for giving
// the assignment a name
function newAssignment(assignmentName) {
    if (assignmentName == undefined || assignmentName == null || assignmentName == '') {
        assignmentName = 'Untitled Assignment';
    }
    var assignmentNameHTML = 
'Assignment Name <input type="text" id="assignment-name-text" name="assignment name" value="' + assignmentName + '"/>' + 
'<input type="submit" id="save-assignment" name="save assignment" value="save assignment"/> </br>';

    $('#assignment-container').append(assignmentNameHTML);
    $('#save-assignment').click(function() {
        saveAssignment();
    });
}

function collectAnswerKey() {
    // read current assignment content and use as answer key for now
    // will want a custom experience for teachers later
}

function generateTeacherOverview(allStudentWork) {
    $('#assignment-container').empty();
    // clear global list of problems
    problems = Array();

    var newProblemSummaryHtml = 
    '<div class="problem-summary-container" style="float:none;overflow: hidden"></div>';

    var newProblemHtml = 
    '<div class="problem-container" style="float:none;overflow: hidden"> <!-- container for nav an equation list -->' +
        '<div style="float:left" class="equation-list"></div>' + 
    '</div>';

    aggregatedWorkForEachProblem = [];
    allStudentWork.forEach(function(assignInfo, index, array) {
        assignInfo.assignment.problems.forEach(function(problem, index, array) {
            workList = aggregatedWorkForEachProblem[problem.problemNumber];
            workList = ( typeof workList != 'undefined' && workList instanceof Array ) ? workList : [];
            workList.push({studentFile : assignInfo.filename, steps : problem.steps});
            aggregatedWorkForEachProblem[problem.problemNumber] = workList;
        });
    });
    // TODO - look at result to pull out problems that don't have matching problem numbers (very few
    // problems end up in one of the lists) and give teachers the opportunity to rearrange them
    aggregatedWorkForEachProblem.forEach(function(problemSummary, index, array) {
        var newProblemDiv = $(newProblemSummaryHtml);
        $('#assignment-container').append(newProblemDiv);
        newProblemDiv.append('<p>Problem number ' + index + '</p>');
        problemSummary.forEach(function(studentWork, index, array) {
            var studentWorkDiv = $(newProblemHtml);
            newProblemDiv.append(studentWorkDiv);
            studentWork.steps.forEach(function(studentWorkStep, index, array) {
                var newSpan = $('<span class="solution-step">' + studentWorkStep + '</span><br>');
                studentWorkDiv.append(newSpan);
                var mq = MathQuill.StaticMath(newSpan, mathQuillOpts);
                mq.reflow();
            });
        });
    });
}

function studentSubmissionsZip(evt) {

    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var content = e.target.result;

            var new_zip = new JSZip();
            // more files !
            new_zip.load(content);

            var allStudentWork = [];

            // you now have every files contained in the loaded zip
            for (file in new_zip.files) { 
                // don't get properties from prototype
                if (new_zip.files.hasOwnProperty(file)) {
                    // extra directory added when zipping files on mac
                    // TODO - check for other things to filter out from zip
                    // files created on other platforms
                    if (file.indexOf("__MACOSX") > -1 || file.indexOf(".DS_Store") > -1) continue;
                    // filter out directories which are part of this list
                    if (new_zip.file(file) == null) continue; 
                    var fileContents = new_zip.file(file).asText();
                    // how is this behaviring differrntly than JSOn.parse()?!?!
                    assignmentData = $.parseJSON(fileContents);
                    allStudentWork.push({filename : file, assignment : assignmentData});
                }
            }
            generateTeacherOverview(allStudentWork);
        }
        r.readAsArrayBuffer(f);
    } else { 
        alert("Failed to load file");
    }
}

// http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            openAssignment(contents, f.name);  
        }
        r.readAsText(f);
    } else { 
        alert("Failed to load file");
    }
}

function openAssignment(serializedDoc, filename) {
    if (!window.confirm("Discard your current work and open the selected document?")) { 
        return; 
    }
    $('#assignment-container').empty();
    var assignment = JSON.parse(serializedDoc);
    problems = Array();
    newAssignment(filename.replace(/\.[^/.]+$/, ""));
    assignment.problems.forEach(function(problem, index, array) {
        newProblem(false);
        var newProblemWrapper = problems[problems.length - 1];
        newProblemWrapper.setProblemNumber(problem.problemNumber);
        problem.steps.forEach(function(step, stepIndex, stepArray) {
            setTimeout(function() {
                newProblemWrapper.addEquation(step);
            }, 50);
        });
    });
}

function serializeAssignment() {
    var outputProblems = [];
    problems.forEach(function(problem, index, array) {
        outputProblems.push( {
            problemNumber : problem.problemNumber(),
            steps : problem.latexForAllSteps()
        }); 
    });
    // return an object wrapping the problems list, to enable doc-wide settings
    // to be stored eventaully
    return { problems: outputProblems };
}

function saveAssignment() {
    var blob = new Blob([JSON.stringify(serializeAssignment())], {type: "text/plain;charset=utf-8"});
    saveAs(blob, $('#assignment-name-text').val() + '.math'); 
}

function createShortcutKeyHandler(problemWrapper) {
    return function(e) {
        // undo/redo, ctrl-z/ctrl-shift-z
        if ((e.which == 122 || e.which == 90) && e.ctrlKey) {
            if (e.shiftKey) {
                problemWrapper.redoStep();
            }
            else {
                problemWrapper.undoLastStep();
            }
        }

        // 101 is the keycode for he e key, 69 for capital e
        // I think some browsers send capital letters, so just
        // checking for that as well
        if ((e.which == 101 || e.which == 69) && e.ctrlKey) {
            problemWrapper.newStep();
        }
    }
}
