You are decompiling an assembly function called `func_800BC33C_jp` in MIPS from a Nintendo 64 game.











# Primary Objective

Decompile the following target assembly function from `asm/jp/code/6DE300.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_800BC33C_jp
nonmatching func_800BC33C_jp, 0x2C
    /* 6DFFDC 800BC33C 27BDFFE0 */  addiu       $sp, $sp, -0x20
    /* 6DFFE0 800BC340 AFA60028 */  sw          $a2, 0x28($sp)
    /* 6DFFE4 800BC344 30C6FFFF */  andi        $a2, $a2, 0xFFFF
    /* 6DFFE8 800BC348 AFBF001C */  sw          $ra, 0x1C($sp)
    /* 6DFFEC 800BC34C 240E0008 */  addiu       $t6, $zero, 0x8
    /* 6DFFF0 800BC350 0C02F0A3 */  jal         func_800BC28C_jp
    /* 6DFFF4 800BC354 AFAE0010 */   sw         $t6, 0x10($sp)
    /* 6DFFF8 800BC358 8FBF001C */  lw          $ra, 0x1C($sp)
    /* 6DFFFC 800BC35C 27BD0020 */  addiu       $sp, $sp, 0x20
    /* 6E0000 800BC360 03E00008 */  jr          $ra
    /* 6E0004 800BC364 00000000 */   nop
endlabel func_800BC33C_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
