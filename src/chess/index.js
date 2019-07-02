import { Router } from 'express';
import { isPositionValid } from './board';
import knightMoves from './knightMoves';

const router = new Router();

// validate params
router.param('position', function(req, res, next, position) {
  const upperCasePosition = position.toUpperCase();
  if (!isPositionValid(upperCasePosition)) {
    res.status(400).send('invalid chess position');
    return;
  }

  req.params.position = upperCasePosition;
  next();
});

router.param('depth', function(req, res, next, depth) {
  if (isNaN(depth)) {
    next(new Error('depth should be an integer'));
  }

  req.params.depth = parseInt(depth);
  next();
});

// define routes
router.get('/knight/:position/:depth?', function(req, res) {
  const { position, depth } = req.params;

  res.status(200).send(knightMoves(position, depth));
});

export default router;
