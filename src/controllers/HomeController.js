class HomeController {
  index(req, res) {
    res.status(200).json({
      ApiON: true,
    });
  }
}

export default new HomeController();
