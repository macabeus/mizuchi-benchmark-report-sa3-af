You are decompiling an assembly function called `func_808C61D8_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/player_actor/m_player/func_808C61D8_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_808C61D8_jp
nonmatching func_808C61D8_jp, 0x20
    /* 7BF8A8 808C61D8 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 7BF8AC 808C61DC AFBF0014 */  sw          $ra, 0x14($sp)
    /* 7BF8B0 808C61E0 0C22D80F */  jal         func_808B603C_jp
    /* 7BF8B4 808C61E4 00000000 */   nop
    /* 7BF8B8 808C61E8 8FBF0014 */  lw          $ra, 0x14($sp)
    /* 7BF8BC 808C61EC 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 7BF8C0 808C61F0 03E00008 */  jr          $ra
    /* 7BF8C4 808C61F4 00000000 */   nop
endlabel func_808C61D8_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
