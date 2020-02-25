function chooseColor(x) {
    console.log(x);
    if (x == 0)
      color = "white"
    else if (x <= 100)
      color = "yellow"
    else if (x <= 1000)
      color = "orange"
    else if (x <= 10000)
      color = "red"
    else if (x <= 100000)
      color = "purple"
    else
      color = "black";
    console.log(color)
    return color
}

  x=3000
  chooseColor(x)