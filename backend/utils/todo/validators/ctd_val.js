const ctd_val = (req,res, next) =>{
    if (!req.body.text) {
        return res.json({
            successful: false,
            error: {text: ['text is required']},
          });
      }
      next();
}

module.exports = {ctd_val};