# Load required libraries
library(plumber)
library(RSQLite)

# Establish connection to SQLite database
con <- dbConnect(RSQLite::SQLite(), "student_database.db")

# Define Plumber API
#* @apiTitle Student Management API

#* Get all students
#* @get /students
function() {
  query <- "SELECT * FROM students"
  result <- dbGetQuery(con, query)
  return(result)
}

#* Add a student
#* @param name The name of the student
#* @param age The age of the student
#* @param grade The grade of the student
#* @post /add_student
function(name, age, grade) {
  query <- sprintf("INSERT INTO students (name, age, grade) VALUES ('%s', '%s', '%s')", name, as.character(age), grade)
  dbExecute(con, query)
  return("Student added successfully")
}

#* Update a student
#* @param id The id of the student to update
#* @param name The new name of the student
#* @param age The new age of the student
#* @param grade The new grade of the student
#* @put /update_student
function(id, name, age, grade) {
  query <- sprintf("UPDATE students SET name='%s', age='%s', grade='%s' WHERE id=%s", name, as.character(age), grade, as.character(id))
  dbExecute(con, query)
  return("Student updated successfully")
}

#* Delete a student
#* @param id The id of the student to delete
#* @delete /delete_student
function(id) {
  query <- sprintf("DELETE FROM students WHERE id=%s", as.character(id))
  dbExecute(con, query)
  return("Student deleted successfully")
}

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
}


