/*
BOTDOTPNG:

    K: read tutorial
	WASD: cursor
	L: change tile
	J: rotate
	I: run robot

@title: botdotpng
@author: mavdotjs
@tags: ['puzzle', 'bot', 'singleplayer']
@addedOn: 2024-08-14
*/

const bg = 'B'
const bot = 'b'
const flag = 'f'
const lava = 'L'
const cursor = 'c'
const hidden = 'x' // not used

// SPAWNS
const spawn = 'o'
const spawn_up = 'u'
const spawn_down = 'd'
const spawn_left = 'l'
const spawn_right = 'r'

// ARROWS
const arr_up = '↑'
const arr_down = '↓'
const arr_left = '←'
const arr_right = '→'

// CONDITIONAL ARROWS: FROM DOWN
const conditional_arr_dd = '⤺'
const conditional_arr_du = '↟'
const conditional_arr_dl = '↰'
const conditional_arr_dr = '↱'

// CONDITIONAL ARROWS: FROM UP
const conditional_arr_uu = '⤻'
const conditional_arr_ud = '↡'
const conditional_arr_ul = '↲'
const conditional_arr_ur = '↳'

// CONDITIONAL ARROWS: FROM LEFT
const conditional_arr_lu = '⬏'
const conditional_arr_ld = '⬎'
const conditional_arr_ll = '⤾'
const conditional_arr_lr = '↠'

// CONDITIONAL ARROWS: FROM RIGHT
const conditional_arr_rd = '⬐'
const conditional_arr_ru = '⬑'
const conditional_arr_rl = '↞'
const conditional_arr_rr = '⤿'

// BOXES
const oncebox = ':'
const lockbox = '*'

const open_box = ';'

// ITEMS
const key = 'k'

// PORTALS
const portal_up = '∩'
const portal_down = 'U'
const portal_left = '['
const portal_right = ']'

const sounds = {
	lose: tune`
37.5: F4^37.5,
37.5: F4~37.5,
37.5: F4~37.5,
37.5: F4~37.5,
37.5: F4~37.5,
1012.5`,
	read: tune`
500: D4^500,
15500`,
	win: tune`
375: E5^375,
11625`,
	walk: tune`
131.00436681222706: C4^131.00436681222706,
4061.135371179039`,
	teleport: tune`
59.171597633136095: C4-59.171597633136095,
59.171597633136095: E4-59.171597633136095,
1775.1479289940828`,
	key_collect: tune`
47.3186119873817: B5-47.3186119873817,
47.3186119873817: A5-47.3186119873817,
47.3186119873817: G5-47.3186119873817,
47.3186119873817: A5-47.3186119873817,
47.3186119873817: B5-47.3186119873817,
1277.602523659306`,
	box_open: tune`
37.5: C4/37.5,
37.5: C4/37.5,
37.5: C4/37.5,
1087.5`,
}

setLegend(
	[
		bot,
		bitmap`
................
................
....00000000....
...0000000000...
..000000000000..
.00077000077000.
.00077000077000.
.00000000000000.
.00000000000000.
.00777777777700.
.00777777777700.
.00000000000000.
..000000000000..
...0000000000...
.00000000000000.
................`,
	],
	[
		cursor,
		bitmap`
LLLLLLLLLLLLLLLL
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
LLLLLLLLLLLLLLLL`,
	],
	[
		flag,
		bitmap`
................
................
................
.......00.......
..3333300.......
..3333300.......
..3333300.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.00000000000000.
.00000000000000.
................`,
	],
	[
		lava,
		bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`,
	],
	[
		spawn,
		bitmap`
................
................
................
................
....33333333....
....3......3....
....3......3....
....3......3....
....3......3....
....3......3....
....3......3....
....33333333....
................
................
................
................`,
	],
	[
		spawn_up,
		bitmap`
.......33.......
.......33.......
.......33.......
.......33.......
....33333333....
....3......3....
....3......3....
....3......3....
....3......3....
....3......3....
....3......3....
....33333333....
................
................
................
................`,
	],
	[
		spawn_down,
		bitmap`
................
................
................
................
....33333333....
....3......3....
....3......3....
....3......3....
....3......3....
....3......3....
....3......3....
....33333333....
.......33.......
.......33.......
.......33.......
.......33.......`,
	],
	[
		spawn_left,
		bitmap`
................
................
................
................
....33333333....
....3......3....
....3......3....
33333......3....
33333......3....
....3......3....
....3......3....
....33333333....
................
................
................
................`,
	],
	[
		spawn_right,
		bitmap`
................
................
................
................
....33333333....
....3......3....
....3......3....
....3......33333
....3......33333
....3......3....
....3......3....
....33333333....
................
................
................
................`,
	],
	[
		arr_up,
		bitmap`
................
................
.......77.......
......7777......
.....777777.....
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
................
................
................`,
	],
	[
		arr_down,
		bitmap`
................
................
................
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.....777777.....
......7777......
.......77.......
................
................`,
	],
	[
		arr_left,
		bitmap`
................
................
................
................
................
....7...........
...77...........
..77777777777...
..77777777777...
...77...........
....7...........
................
................
................
................
................`,
	],
	[
		arr_right,
		bitmap`
................
................
................
................
................
...........7....
...........77...
...77777777777..
...77777777777..
...........77...
...........7....
................
................
................
................
................`,
	],
	[
		conditional_arr_ul,
		bitmap`
................
................
................
.......33.......
.......33.......
....7..33.......
...77..33.......
..7777773.......
..7777733.......
...77...........
....7...........
................
................
................
................
................`,
	],
	[
		conditional_arr_dl,
		bitmap`
................
................
................
................
................
....7...........
...77...........
..7777733.......
..7777773.......
...77..33.......
....7..33.......
.......33.......
.......33.......
................
................
................`,
	],
	[
		conditional_arr_rl,
		bitmap`
................
................
................
................
................
....7...........
...77...........
..77777333333...
..77777333333...
...77...........
....7...........
................
................
................
................
................`,
	],
	[
		conditional_arr_ll,
		bitmap`
................
................
....7...........
...77...........
..77777777777...
..77777777773...
...77..333333...
....7..333333...
................
................
................
................
................
................
................
................`,
	],
	[
		conditional_arr_ur,
		bitmap`
................
................
................
.......33.......
.......33.......
.......33..7....
.......33..77...
.......3777777..
.......3377777..
...........77...
...........7....
................
................
................
................
................`,
	],
	[
		conditional_arr_dr,
		bitmap`
................
................
................
................
................
...........7....
...........77...
.......3377777..
.......3777777..
.......33..77...
.......33..7....
.......33.......
.......33.......
................
................
................`,
	],
	[
		conditional_arr_rr,
		bitmap`
................
................
...........7....
...........77...
...77777777777..
...37777777777..
...333333..77...
...333333..7....
................
................
................
................
................
................
................
................`,
	],
	[
		conditional_arr_lr,
		bitmap`
................
................
................
................
................
...........7....
...........77...
...33333377777..
...33333377777..
...........77...
...........7....
................
................
................
................
................`,
	],
	[
		conditional_arr_du,
		bitmap`
................
................
.......77.......
......7777......
.....777777.....
.......77.......
.......77.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................
................`,
	],
	[
		conditional_arr_uu,
		bitmap`
................
................
....77..........
...7777.........
..777777........
....77..........
....77..........
....7733........
....7733........
....7733........
....7733........
....7733........
....7333........
................
................
................`,
	],
	[
		conditional_arr_lu,
		bitmap`
................
................
.......77.......
......7777......
.....777777.....
.......77.......
.......77.......
...333373.......
...333333.......
................
................
................
................
................
................
................`,
	],
	[
		conditional_arr_ru,
		bitmap`
................
................
.......77.......
......7777......
.....777777.....
.......77.......
.......77.......
.......373333...
.......333333...
................
................
................
................
................
................
................`,
	],
	[
		conditional_arr_dd,
		bitmap`
................
................
................
........3337....
........3377....
........3377....
........3377....
........3377....
........3377....
..........77....
..........77....
........777777..
.........7777...
..........77....
................
................`,
	],
	[
		conditional_arr_ud,
		bitmap`
................
................
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......77.......
.......77.......
.....777777.....
......7777......
.......77.......
................
................`,
	],
	[
		conditional_arr_ld,
		bitmap`
................
................
................
................
................
................
................
...333333.......
...333373.......
.......77.......
.......77.......
.....777777.....
......7777......
.......77.......
................
................`,
	],
	[
		conditional_arr_rd,
		bitmap`
................
................
................
................
................
................
................
.......333333...
.......373333...
.......77.......
.......77.......
.....777777.....
......7777......
.......77.......
................
................`,
	],
	[
		oncebox,
		bitmap`
CCCCCCCCCCCCCCCC
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
C0C0C0C0C0C0C0CC
CC0C0C0C0C0C0C0C
CCCCCCCCCCCCCCCC`,
	],
	[
		lockbox,
		bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCC000000CCCCC
CCCCCCC00CCCCCCC
CCCCC0000CCCCCCC
CCCCCCC00CCCCCCC
CCCCC0000CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`,
	],
	[
		key,
		bitmap`
................
................
................
................
.....666666.....
.....66..66.....
.....66..66.....
.....666666.....
.......66.......
.....6666.......
.......66.......
.....6666.......
................
................
................
................`,
	],
	[
		open_box,
		bitmap`
CCCCCCCCCCCCCCCC
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
C..............C
CCCCCCCCCCCCCCCC`,
	],
	[
		hidden,
		bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`,
	],
	[
		portal_up,
		bitmap`
6666666666666666
6666666666666666
66............66
66............66
66............66
66............66
................
................
................
................
................
................
................
................
................
................`,
	],
	[
		portal_down,
		bitmap`
................
................
................
................
................
................
................
................
................
................
77............77
77............77
77............77
77............77
7777777777777777
7777777777777777`,
	],
	[
		portal_left,
		bitmap`
777777..........
777777..........
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
77..............
777777..........
777777..........`,
	],
	[
		portal_right,
		bitmap`
..........666666
..........666666
..............66
..............66
..............66
..............66
..............66
..............66
..............66
..............66
..............66
..............66
..............66
..............66
..........666666
..........666666`,
	],
	[
		bg,
		bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`,
	],
)

setSolids([oncebox, lockbox, hidden, bot])

// GROUPS

const spawn_tilecycle = [spawn, spawn_up, spawn_down, spawn_left, spawn_right]
const command_tilecycle = [arr_up, arr_down, arr_left, arr_right]

const conditional_arr_from_u = [
	conditional_arr_uu,
	conditional_arr_ud,
	conditional_arr_ul,
	conditional_arr_ur,
]
const conditional_arr_from_d = [
	conditional_arr_du,
	conditional_arr_dd,
	conditional_arr_dl,
	conditional_arr_dr,
]
const conditional_arr_from_l = [
	conditional_arr_lu,
	conditional_arr_ld,
	conditional_arr_ll,
	conditional_arr_lr,
]
const conditional_arr_from_r = [
	conditional_arr_ru,
	conditional_arr_rd,
	conditional_arr_lr,
	conditional_arr_rl,
]

const conditional_arr_tilecycle = [
	...conditional_arr_from_d,
	...conditional_arr_from_u,
	...conditional_arr_from_l,
	...conditional_arr_from_r,
]

const writable_information = [
	...spawn_tilecycle,
	...command_tilecycle,
	...conditional_arr_tilecycle,
]

const portal_ud = [portal_up, portal_down]
const portal_lr = [portal_left, portal_right]
const portals = [...portal_ud, ...portal_lr]

const readable_information = [
    flag,
	lava,
	oncebox,
	key,
	...portals,
	...writable_information,
]

let isPlaying = false
let unlockedConditional = false

let level = 0
const levels = [
	map`
LLLLLLLLLLL
LoLLLL....L
L.LLLL.LL.L
L.LLLL.LL.L
L......LL.L
LLLLLLLLL.L
LLLLLLLLLfL
LLLLLLLLLLL`,
	map`
LLLLLLLLLLL
LoL...L...L
L.L.L.L.L.L
L.L.L.L.L.L
L.L.L.L.L.L
L.L.L.L.L.L
L.L.L.L.L.L
L.L.L.L.L.L
L...L...LfL
LLLLLLLLLLL`,
	map`
LLLLLLLL
LfL....L
L...L..L
LLLLLL.L
L...L..L
LoL....L
LLLLLLLL`,
	map`
LLLLLLLLLLLL
o.LLLLLLLLLL
L...LLLLLLLL
LL....LLLLLL
LLLLL...LLLL
LLLLLLL..LLL
LLLLLLLL...L
LLLLLLLLL.fL`,
	map`
LLLLLLLLLLLLLLLLL
LLLL..LLLLLLLLLLL
LLLL..:......LLLL
LLLL..LLLLLL.LLLL
L..LL:LL.......LL
L..:...L........f
L..L...L.......LL
LLoLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLL`,
	map`
LLLLLLLLLLLLLL
L...L......LfL
Lo..L.k....L.L
LL:LL:LLL:LL.L
L..........*.L
L..........LLL
LLLLLLLLLLLLLL`,
	map`
LLLLLLLLLLLLLLL
LLLLLLLLLLL..LL
L............LL
L.LLLLLLLLL:LLL
LoLf........LLL
LLLLLLLLLLLLLLL`,
	map`
LLLLLLLLLLLL
LLLLLLLLLLLL
LLL......LLL
LLL......LLL
LLL.LLL:LLLL
.]L.L[..LLLL
.LL.LLLLLLLL
.LL.]LL[...L
.LLLLLLLLLUL
.LLLLLLLLLLL
......fLLL∩L
LLLLLLLLLLoL
LLLLLLLLLLLL`,
	map`
LLLLLLLLLLL
L.]LLLLL[.L
LULLLLLLLUL
LLLLLLLLLLL
LLLLLLLLL∩L
LLLLLo]L[.L
LLLLLLLLLLL
LLLLLLLLLLL
L∩LLLLLLLLL
L.]LLLLL[fL
LLLLLLLLLLL`,
	map`
LLLLLLLLLLLL
LLL......LLL
LLL.LLLL.LoL
L...L......L
LULLL.LL.LLL
LLLLL.k..LLL
L∩LLLLLLLLLL
L..........L
LLLLLLLLLL*L
Lf.........L
LLLLLLLLLLLL`,
	map`
LLLLLLLLLLLLL
LL.]LLLLLLL[.
LLULLLLLLLLLU
LLLL....LLLLL
LLLL.LL.LLLLL
LLLL.fL.LLLLL
LL∩LLLL*LLLLL
L..:....LLLLL
L..LLLLLLLLLL
LLLLd.......∩
.k...........
LLLLLLLLLLLLL`,
	map`
LLLLLLLLLLLLLLLLL
LLLL..LLLLLLLLLLL
LLLL..:.]LL[..LLL
LLLL..LLLLLLL.LLL
L..L..LL......LLL
L..:...L......:*f
L..Lk..L......LLL
LLoL...LLLLLLLLLL
LLLLLLLLLLLLLLLLL`,
	map`
LLLLLLLLLLLLLLLLLLLL
Lo...LLLLLLLLLLLLLLL
LLLLULLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL
LLL............LLLLL
LLL.LLLLLLLL...LLLLL
L.k.......LLL:LLLLLL
LLLLLLLLLULL...LLLLL
LLLLLLLLLLLL...:*fLL
LLLL∩LLLL∩LL...LLLLL
LLLL.]LL[.LLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL`,
]

setMap(levels[level])
addSprite(0, 1, cursor)
setBackground(bg)

const keyboardInfo = [
	'K: read tutorial',
	'WASD: cursor',
	'L: change tile',
	'J: rotate',
	'I: run robot',
]

function createTutorial(str) {
	const chunkSize = 20
	const chunks = []
	let currentIndex = 0
	while (currentIndex < str.length && str.length !== 0) {
		let endIndex = currentIndex + chunkSize
		if (endIndex < str.length && str[endIndex] !== ' ') {
			while (endIndex > currentIndex && str[endIndex] !== ' ') {
				endIndex--
			}
		}
		if (endIndex === currentIndex) {
			endIndex = currentIndex + chunkSize
		}
		chunks.push(str.slice(currentIndex, endIndex).trim())
		currentIndex = endIndex + 1
	}

	return [...keyboardInfo, ...chunks, '']
}

let tutorialIdx = 0
let doTutorial = true
let unlockConditionalsAt = 10

const tutorial = [
	createTutorial(
		"Red square is the spawn for the robot. you must rotate it (J) to the direction the bot should start going in. now try to run it when you do, the bot goes into the lava. you can prevent this by placing an arrow (L) after placing it you must rotate it to the direction the bot should go when it touches it. your goal is to reach the flag. If a level introduces something new, it'll be explained here.",
	),
	createTutorial(''),
	createTutorial(''),
	createTutorial(''),

	createTutorial(
		'The new block is the oncebox, it is a solid block, but when the bot walks past it, it opens. it will not open if the bot walks directly towards it.',
	),
	createTutorial(
		'This is the lockbox, it pairs with the key and will open when the key is collected!',
	),
	createTutorial(''),

	createTutorial(
		'The new block is the portal! pretty self-explanatory, teleports the bot to the nearest opposite portal in that direction',
	),
	createTutorial(''),
	createTutorial(''),

	createTutorial(
		'You have now unlocked conditional arrows!!, conditional arrows will only send the bot in the blue direction if they are coming from the red direction. You can place conditional arrows by doing the place action on an arrow (L twice)',
	),
	createTutorial('This looks pretty familiar...'),
	createTutorial(''),
]

let interval = null

function resetLevel() {
	const data = getAll().filter((v) => writable_information.includes(v.type))
	setMap(levels[level])
	tilesWith(spawn).forEach((v) => v.forEach((v) => v.remove()))
	data.forEach(({ x, y, type }) => {
		addSprite(x, y, type)
	})
}

function updateTutorial() {
	const tutorialText = tutorial[level][tutorialIdx]
	clearText()
	addText(tutorialText, { color: color`7` })
}

function cycleSelected(value) {
	const spawnIndex = spawn_tilecycle.indexOf(value)
	if (spawnIndex !== -1) {
		return spawn_tilecycle[(spawnIndex + 1) % spawn_tilecycle.length]
	}
	const commandIndex = command_tilecycle.indexOf(value)
	if (commandIndex !== -1) {
		return command_tilecycle[(commandIndex + 1) % command_tilecycle.length]
	}
	const conditionalArrowIndex = conditional_arr_tilecycle.indexOf(value)
	if (conditionalArrowIndex !== -1) {
		return conditional_arr_tilecycle[
			(conditionalArrowIndex + 1) % conditional_arr_tilecycle.length
		]
	}
}

function getSelectedSprite() {
	const tile = getTile(getFirst(cursor).x, getFirst(cursor).y).filter((v) =>
		v.type !== cursor
	)
	return tile.length > 0
		? tile.filter((v) => writable_information.includes(v.type))[0]
		: false
}

function tryToMove(sprite, dir) {
	const correctX = sprite.x + dir.x
	const correctY = sprite.y + dir.y
	sprite.x += dir.x
	sprite.y += dir.y
	return sprite.x === correctX && sprite.y === correctY
}

function getDirection(spriteType, lastDirection) {
	let direction = { x: 0, y: 0 }
	const map = [
		[0, 0],
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0],
	]
	const spawnIndex = spawn_tilecycle.indexOf(spriteType)
	if (spawnIndex !== -1) {
		const val = map[spawnIndex]
		direction.x = val[0]
		direction.y = val[1]
	}
	const commandIndex = command_tilecycle.indexOf(spriteType)
	if (commandIndex !== -1) {
		const val = map[commandIndex + 1]
		direction.x = val[0]
		direction.y = val[1]
	}
	if (conditional_arr_tilecycle.includes(spriteType)) {
		if (!lastDirection) return direction
		let idx
		if (lastDirection.y === 1) {
			idx = conditional_arr_from_u.indexOf(spriteType)
		} else if (lastDirection.y === -1) {
			idx = conditional_arr_from_d.indexOf(spriteType)
		} else if (lastDirection.x === 1) {
			idx = conditional_arr_from_l.indexOf(spriteType)
		} else if (lastDirection.x === -1) {
			idx = conditional_arr_from_r.indexOf(spriteType)
		}
		if (idx === -1) return lastDirection // this arrow doesn't apply to me right now, skip!
		const val = map[idx + 1]
		direction.x = val[0]
		direction.y = val[1]
	}
	return direction
}

function adjacent() {
	const x = [0, 0, -1, 1]
	const y = [-1, 1, 0, 0]
	return new Array(4).fill(0).map((_, index) => {
		return { x: x[index], y: y[index] }
	})
}

function moveAndUpdate(me, dir) {
	const did_move = tryToMove(me, dir)
	if (did_move) {
		adjacent().filter((v) => v.x !== dir.x || v.y !== dir.y).forEach((v) => {
			const tile = getTile(me.x + v.x, me.y + v.y).filter((v) =>
				readable_information.includes(v.type)
			)[0]
			if (!tile) {
				return
			}
			if (tile.type === oncebox) {
				playTune(sounds.box_open)
				tile.type = open_box
			}
		})
		const tile = getTile(me.x, me.y).filter((v) =>
			readable_information.includes(v.type)
		)[0]
		if (!tile) {
			return true
		}
		if (portals.includes(tile.type)) {
			let otherPortalType
			if (portal_ud.includes(tile.type)) {
				if (tile.type === portal_up && dir.y === -1) {
					otherPortalType = portal_down
				} else if (tile.type === portal_down && dir.y === 1) {
					otherPortalType = portal_up
				}
			} else if (portal_lr.includes(tile.type)) {
				if (tile.type === portal_left && dir.x === -1) {
					otherPortalType = portal_right
				} else if (tile.type === portal_right && dir.x === 1) {
					otherPortalType = portal_left
				}
			}
			let pos = { x: me.x, y: me.y }
			let found = false
			do {
				pos.x += dir.x
				pos.y += dir.y
				const tile = getTile(pos.x, pos.y).find((v) =>
					v.type === otherPortalType
				)
				if (!tile) {
					continue
				}
				playTune(sounds.teleport)
				found = true
				me.x = pos.x
				me.y = pos.y
			} while (
				pos.x < width() && pos.y < height() && pos.x >= 0 && pos.y >= 0 &&
				!found
			)
		} else if (tile.type === key) {
			tile.remove()
			playTune(sounds.key_collect)
			setTimeout(() => {
				getAll(lockbox).forEach((v) =>
					v.type = open_box
				)
				playTune(sounds.box_open)
			}, 200)
		}
	}
	return did_move
}

function* botRead() {
	const me = getFirst(bot)
	let stop = false
	let lastDirection = { x: 0, y: 0 }
	do {
		if (!isPlaying) yield 'l'
		const tile =
			getTile(me.x, me.y).filter((v) =>
				readable_information.includes(v.type)
			)[0]

		if (tile === undefined || portals.includes(tile.type)) {
			playTune(sounds.walk)
			stop = !moveAndUpdate(me, lastDirection)
			yield
			continue
		}
		if (writable_information.includes(tile?.type)) {
			playTune(sounds.read)
			yield // wait a bit to "read" the information
			const dir = getDirection(tile.type, lastDirection)
			if (dir.x === dir.y && dir.x === 0) {
				stop = true
				yield 'l'
			}
			stop = !moveAndUpdate(me, dir)
			lastDirection = dir
		} else if (tile.type === lava) {
			stop = true
			yield 'l'
		} else if (tile.type === flag) {
			stop = true
			yield 'w'
		}
		yield
	} while (!stop)
}

updateTutorial()

onInput('s', () => {
	if (isPlaying === false) getFirst(cursor).y += 1
})
onInput('w', () => {
	if (isPlaying === false) getFirst(cursor).y -= 1
})

onInput('d', () => {
	if (isPlaying === false) getFirst(cursor).x += 1
})
onInput('a', () => {
	if (isPlaying === false) getFirst(cursor).x -= 1
})

onInput('i', () => {
	if (isPlaying) {
		resetLevel()
		isPlaying = false
		return
	}
	getFirst(cursor).remove()
	isPlaying = true
	const spawn = getAll().filter((v) => spawn_tilecycle.includes(v.type))[0]
	addSprite(spawn.x, spawn.y, bot)
	const readGen = botRead()
	interval = setInterval(() => {
		const { value, done } = readGen.next()
		if (value === 'l') {
			playTune(sounds.lose)
			clearInterval(interval)
			isPlaying = false
			resetLevel()
			addSprite(0, 1, cursor)
		} else if (value === 'w') {
			playTune(sounds.win)
			clearInterval(interval)
			isPlaying = false
			level++
			if (level === unlockConditionalsAt) {
				unlockedConditional = true
			}
			if (levels.length === level) {
				doTutorial = false
				clearText()
				getFirst(bot).remove()
				addText("That's all!", { color: color`7` })
			} else {
				tutorialIdx = 0
				setMap(levels[level])
				updateTutorial()
			}
			addSprite(0, 0, cursor)
		}
		if (done) {
			isPlaying = false
			clearInterval(interval)
		}
	}, 500 / 2)
})

onInput('j', () => {
	if (isPlaying === true) return
	const sprite = getSelectedSprite()
	if (!sprite) return
	sprite.type = cycleSelected(sprite.type)
})

onInput('l', () => {
	const sprite = getSelectedSprite()
	if (isPlaying === true) return
	if (sprite === false) {
		addSprite(getFirst(cursor).x, getFirst(cursor).y, command_tilecycle[0])
	} else {
		if (!sprite) return
		if (command_tilecycle.includes(sprite.type)) {
			if (unlockedConditional) {
				sprite.type = conditional_arr_tilecycle[0]
			} else sprite.remove()
		}
		if (conditional_arr_tilecycle.includes(sprite.type)) {
			sprite.remove()
		}
	}
})

onInput('k', () => {
	if (!doTutorial) return
	tutorialIdx = (tutorialIdx + 1) % tutorial[level].length
	updateTutorial()
})
