---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Armenian Words"
subtitle: "Generating Armenian word translations for upload to quizlet"
summary: "Generating Armenian word translations for upload to quizlet"
authors: []
tags: ["python", "language", "learning"]
categories: []
date: 2021-03-14T00:13:48-08:00
lastmod: 2021-03-14T00:13:48-08:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

# Inspiration

I was recently inspired by the below youtube video to approach language learning in a different way.
When I think back to highschool, learning a new language consisted of starting with foundational elements and slowly 
working your way up the linguistic ladder. But what if your goal was just to talk to someone? 
Could you get by with just the most common words? 

{{< youtube 3i1lNJPY-4Q >}}

This instantly made me think of a language I have been interested in using conversationally, 
but have been scared to approach: Armenian.

# Minor Hiccup:
Ok, so I love this idea, but how to approach it. Obviously I would want to leverage something like "Spaced Repetition". 
If you have never heard of spaced repetition, I would highly recommend this youtube video:

{{< youtube Z-zNHHpXoMM >}}

So the tool that would jump out to me to make this task easier is quizlet.
Of course, I do the initial search, and don't find what I am looking for. 
Now the idea of uploading 1000 flashcards to quizlet seems horrible...
What to do... What to do...

# Python to the rescue
Quizlet lets you uploaded comma separated lists and auto generate flashcards from that.
Lets set our goal to generate that list.

First lets get and parse an armenian dictionary:

Nifty note: Python handles these non english letters so nicely!
```python
raw_alphabet = """ա	ɑ	ɑ	Like the 'ah' in 'father'
բ	b	pʰ	like the 'b' in 'boat'
գ	ɡ	kʰ	like the 'k' in 'key' or 'g' in 'goat'
դ	d	tʰ	like the 'd' in 'dog'
ե	(j)ɛ	(j)ɛ	like the 'ye' in 'yet' or 'eh' in 'bet'
զ	z	z	like the 'z' in 'zebra'
է	ɛ	ɛ	Like the 'e' in 'end'
ը	ə	ə	Like the 'u' in 'but'
թ	tʰ	tʰ	Like the 't' in 'tomorrow'
ժ	ʒ	ʒ	Like the 's' in 'measure'
ի	i	i	Like the 'ee' in 'meet'
լ	l	l	Like the 'l' in 'lily'
խ	χ	χ	Like guttural 'ch' in 'Bach'
ծ	ts	dz	Like the 'tz' in 'Mitzi'
կ	k	ɡ	Like the 'ck' in 'Micky'
հ	h	h	Like the 'h' in 'hello'
ձ	dz	tsʰ	Like the 'ds' in 'kids'
ղ	ʁ	ʁ	Like a guttural French 'r'
ճ	tʃ	dʒ	Like a hard, clipped 'j' 
մ	m	m	Like the 'm' in 'mom'
յ	j	j	Like the 'y' in 'year' or 'y' in 'buy'
ն	n	n	Like the 'n' in 'number'
շ	ʃ	ʃ	Like the 'sh' in 'shower'
ո	(v)o	(v)o	Like the 'vo' in 'vocal' (beginning) or 'o' in 'low' (within a word)
չ	tʃʰ	tʃʰ	Like the 'ch' in 'church'
պ	p	b	Like the 'p' in 'pizza'
ջ	dʒ	tʃʰ	Like the 'j' in 'jeans'
ռ	r	r/ɾ	Like the rolled Spanish 'r'
ս	s	s	Like the 's' in 'sand'
վ	v	v	Like the 'v' in 'Victor'
տ	t	d	Like a hard 't' in 'but'
ր	ɾ	ɾ	Like the 'r' in 'red' or 'rh' in 'bother' (word endings)
ց	tsʰ	tsʰ	Like the 'ts' in 'bits'
ւ	v	v	like the 'oo' in 'cool'
փ	pʰ	pʰ	like the 'p' in 'pear'
ք	kʰ	kʰ	like the 'k' in 'kite'
օ	o	o	like the 'o' in 'bone'
ֆ	f	f	like the 'f' in 'life'
ու	u	u	like the 'oo' in 'cool'
և	(j)ɛv	(j)ɛv	Combination of sounds 'ye' and 'v'
 :	 :	 :	Full stop or period."""


def get_armenian_alphabet_map():
    armenian_alphabet_map = {}
    for line in raw_alphabet.splitlines():
        line_chunks = line.split()
        # I think these are uppercase?
        armenian_letter = line_chunks[0]
        english_sound = line_chunks[1]
        pronunciation_example = line_chunks[2]
        english_sound_description = line_chunks[3:]
        # print(f"Armernian Letter: {armenian_letter} english sound: {english_sound} pronunciation_example: {pronunciation_example} english_sound_description: {' '.join(english_sound_description)}")
        armenian_alphabet_map[armenian_letter] = (english_sound, pronunciation_example, ' '.join(english_sound_description))
    return armenian_alphabet_map


if __name__ == '__main__':
    armenian_map = get_armenian_alphabet_map()
    for k,v in armenian_map.items():
        print(f"Armernian Letter: {k} english sound: {v[0]} pronunciation_example: {v[1]} english_sound_description: {v[2]}")
```

Next lets get and parse a list of 1000 most common armenian words (I cut out some of the words in this example to save on space):

```python

raw_words = """1	ինչպես	as
2	ես	I
3	նրա	his
4	որ	that
5	նա	he
6	էր	was
7	համար	for
8	– ին	on
9	են	are
10	հետ	with
11	նրանք	they
12	լինել	be
13	ի	at
14	մեկ	one
15	ունենալ	have
16	այս	this
17	– ից	from
18	ի	by
19	տաք	hot
20	բառ	word
995	աղ	salt
996	քիթը	nose
997	հոգնակի	plural
998	զայրույթը	anger
999	պահանջը	claim
1000	անարատ	continent"""


def get_words():
    words = {}
    for line in raw_words.splitlines():
        line_chunks = line.split()
        # I think these are uppercase?
        idx = line_chunks[0]
        armenian_word = line_chunks[1]
        english_translation = line_chunks[2]
        # print(armenian_word, english_translation)
        words[english_translation] = armenian_word
    return words


if __name__ == '__main__':
    words = get_words()
    for k, v in words.items():
        print(k, v)
```

Cool, now all we need to do is work our magic:

```python
from words import get_words
from armenian_alphabet import get_armenian_alphabet_map


def get_letter_info(armenian_word, armenian_lookup):
    english_sound = []
    pronunciation = []
    english_sound_description = []
    for letter in armenian_word:
        if letter == '–':
            # skip there are for words that are added to others and is a special case that i need to handle
            continue
        try:
            english_sound.append(armenian_lookup[letter][0])
            pronunciation.append(armenian_lookup[letter][1])
            english_sound_description.append(armenian_lookup[letter][2])
        except KeyError:
            # TODO: handle this
            # print(f"We couldn't translate the armenian word: {armenian_word} due to letter {letter}")
            return None

    return f"{''.join(pronunciation)} ({armenian_word}) [{' '.join(english_sound_description)}]"


def generate_quizlet_table():
    words_dict = get_words()
    armenian_lookup = get_armenian_alphabet_map()
    total_words_analyzed = 0
    for english_word, armenian_word in words_dict.items():
        front_of_card = english_word
        back_of_card = get_letter_info(armenian_word, armenian_lookup)
        if back_of_card:
            total_words_analyzed += 1
            print(f"{front_of_card}, {back_of_card}")
        else:
            continue

    print(f"Total words analyzed: {total_words_analyzed}")


if __name__ == '__main__':
    generate_quizlet_table()
```

# Perfection

Our output looks something like this
```text
one, m(j)ɛɡ (մեկ) [Like the 'm' in 'mom' like the 'ye' in 'yet' or 'eh' in 'bet' Like the 'ck' in 'Micky']
```
As you can see the first word is the english word, aka the front of the flash card.
Everything after that is on the back, and consists of the phonetic spelling, the word in armenian, and a helpful guide 
on how to actually spell it, cause my phonetic english reading skills aren't that great haha.

You can check out the full repo [here](https://github.com/dddiaz/1000-armenian-words)

You can also check out the online quizlet with all the words [here](https://quizlet.com/_9kbxzw?x=1jqt&i=2p3dwm)

# What's next
I had so much fun with this little python project, I forget I actually need to learn some Armenian words... BRB.




