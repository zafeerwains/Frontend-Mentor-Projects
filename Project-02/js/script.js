const inputValue = id => document.getElementById(id).value
const outputValue = (id, data) => document.getElementById(id).innerHTML = data
const calculateAge = () => {
    document.getElementById("daysError").innerText = ""
    document.getElementById("monthsError").innerText = ""
    document.getElementById("yearsError").innerText = ""
    let userDate = inputValue("daysInput")
    if (userDate > 31 || userDate < 1) return document.getElementById("daysError").innerText = "Enter the Correct Date"
    let userMonth = inputValue("monthsInput")
    if (userMonth > 12 || userDate < 1) return document.getElementById("monthsError").innerText = "Enter the Correct Month"
    if (userMonth == 4 || userMonth == 6 || userMonth == 9 || userMonth == 11) {
        if (userDate > 30 || userDate < 1)
            return document.getElementById("daysError").innerText = "Enter the Correct Date";
    }
    if (userMonth == 2) {
        if (userDate > 29 || userDate < 1)
            return document.getElementById("daysError").innerText = "Enter the Correct Date";
    }
    let userYear = inputValue("yearsInput")
    if (userYear > new Date().getFullYear()) return document.getElementById("yearsError").innerText = "Enter the past year"
    let dobFullYear = new Date().setFullYear(Number(userYear), Number(userMonth - 1), Number(userDate))
    let currentDate = new Date()
    let ageInMM = currentDate - dobFullYear
    let ageInYears = ageInMM / 1000 / 60 / 60 / 24 / 365
    let ageInMonths = ageInYears.toString().split(".")
    ageInMonths = ageInMonths[1]
    ageInMonths = Math.floor(Number("." + ageInMonths[1]) * 12)
    let ageInDays = userDate - new Date().getDate()
    if (ageInDays < 0) {
        ageInDays = ageInDays + 30
    }
    ageInYears = Math.floor(ageInMM / 1000 / 60 / 60 / 24 / 365)
    outputValue("daysOutput", ageInDays)
    outputValue("monthsOutput", ageInMonths)
    outputValue("yearsOutput", ageInYears)
}