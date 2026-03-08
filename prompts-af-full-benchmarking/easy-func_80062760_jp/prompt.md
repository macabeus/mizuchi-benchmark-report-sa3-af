You are decompiling an assembly function called `func_80062760_jp` in MIPS from a Nintendo 64 game.

# Examples

## `func_800D96A8_jp`

```c
void func_800D96A8_jp(void) {
    func_800D9788_jp();
    func_800D9618_jp(0);
    func_800D9618_jp(1);
    func_800D9618_jp(2);
    func_800D9618_jp(3);
}
```

```asm
         addiu sp, sp, -0x18
         sw ra, 0x14(sp)
         jal func_800D9788_jp
         nop 
         jal func_800D9618_jp
         or a0, zero, zero
         jal func_800D9618_jp
         addiu a0, zero, 0x1
         jal func_800D9618_jp
         addiu a0, zero, 0x2
         jal func_800D9618_jp
         addiu a0, zero, 0x3
         lw ra, 0x14(sp)
         addiu sp, sp, 0x18
         jr ra
         nop 
```









# Primary Objective

Decompile the following target assembly function from `asm/jp/code/683030.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80062760_jp
nonmatching func_80062760_jp, 0x40
    /* 686400 80062760 27BDFFE8 */  addiu       $sp, $sp, -0x18
    /* 686404 80062764 AFBF0014 */  sw          $ra, 0x14($sp)
    /* 686408 80062768 AFA40018 */  sw          $a0, 0x18($sp)
    /* 68640C 8006276C 8FA40018 */  lw          $a0, 0x18($sp)
    /* 686410 80062770 0C018944 */  jal         func_80062510_jp
    /* 686414 80062774 00002825 */   or         $a1, $zero, $zero
    /* 686418 80062778 0C0183F7 */  jal         func_80060FDC_jp
    /* 68641C 8006277C 8FA40018 */   lw         $a0, 0x18($sp)
    /* 686420 80062780 0C01836A */  jal         func_80060DA8_jp
    /* 686424 80062784 8FA40018 */   lw         $a0, 0x18($sp)
    /* 686428 80062788 0C0193E1 */  jal         func_80064F84_jp
    /* 68642C 8006278C 8FA40018 */   lw         $a0, 0x18($sp)
    /* 686430 80062790 8FBF0014 */  lw          $ra, 0x14($sp)
    /* 686434 80062794 27BD0018 */  addiu       $sp, $sp, 0x18
    /* 686438 80062798 03E00008 */  jr          $ra
    /* 68643C 8006279C 00000000 */   nop
endlabel func_80062760_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
