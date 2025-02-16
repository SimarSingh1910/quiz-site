<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>home</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="style_home.css">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
    </style>
</head>
<body>
  <!-- Navingation bar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
   <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"   aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Voting</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">results</a>
          </li>
          <li class="nav-item dropdown profile">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg width="10px" height="10px" xmlns=""></svg>
            </a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Voter</a></li>
            <li><a class="dropdown-item" href="#">Candidate</a></li>
           </ul>
          </li>
        </ul>
        <!-- <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
       </form> -->
      </div>
  </div>
  </nav>

<!--ongoing tabs-->
<div class="ongoing">
  <h1>ONGOING</h1>
  <div class="ongoing_cont">
    <div class="ongoing_polls">this is ongoing vote</div>
    <div class="ongoing_polls">this is ongoing vote</div>
  </div>
</div>

  

<!--recents tab-->
  <div class="recent">
    <h1>RECENTS</h1>
  <div class="recents_cont">
    <div class="recent_poll"><img src="bar graph.jpg" alt="img of graph" height="300px" width="645px"></div>
    <div class="recent_poll">this is a div</div>
  </div>
  </div>

  







  <script src="home_script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>