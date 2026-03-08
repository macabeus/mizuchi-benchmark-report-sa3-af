You are decompiling an assembly function called `func_80A242E0_jp` in MIPS from a Nintendo 64 game.

# Examples

## `func_80973160_jp`

```c
void func_80973160_jp(void* data, Actor* actor) {
    Clip_BoxTrickData* clip;
    s32 i;
    s32 blockX;
    s32 blockZ;

    mFI_Wpos2BlockNum(&blockX, &blockZ, actor->world.pos);

    clip = common_data.clip.boxTrickData;

    for (i = 0; i < 4; i++) {
        if (clip[i].data == NULL) {
            clip[i].data = data;
            clip[i].blockX = blockX;
            clip[i].blockZ = blockZ;
            return;
        }
    }
}
```

```asm
         addiu sp, sp, -0x38
         sw s0, 0x20(sp)
         or s0, a0, zero
         sw ra, 0x24(sp)
         sw a1, 0x3c(sp)
         lw t6, 0x3c(sp)
         addiu a0, sp, 0x2c
         addiu a1, sp, 0x28
         lw t8, 0x28(t6)
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lui t9, %hi(common_data+0x10010)
         lw t9, %lo(common_data+0x10010)(t9)
         lui t2, %hi(common_data+0x10018)
         lui at, %hi(common_data+0x10010)
         bnez t9, .L7830
         nop 
         lw t0, 0x2c(sp)
         sw s0, %lo(common_data+0x10010)(at)
         lui at, %hi(common_data+0x1000c)
         lw t1, 0x28(sp)
         sb t0, %lo(common_data+0x1000c)(at)
         lui at, %hi(common_data+0x1000d)
         b .L10c67
         sb t1, %lo(common_data+0x1000d)(at)
     20lw t2, %lo(common_data+0x10018)(t2)
         lui t5, %hi(common_data+0x10020)
         lui at, %hi(common_data+0x10018)
         bnez t2, .Lac43
         nop 
         lw t3, 0x2c(sp)
         sw s0, %lo(common_data+0x10018)(at)
         lui at, %hi(common_data+0x10014)
         lw t4, 0x28(sp)
         sb t3, %lo(common_data+0x10014)(at)
         lui at, %hi(common_data+0x10015)
         b .L10c67
         sb t4, %lo(common_data+0x10015)(at)
     33lw t5, %lo(common_data+0x10020)(t5)
         lui t8, %hi(common_data+0x10028)
         lui at, %hi(common_data+0x10020)
         bnez t5, .Le056
         nop 
         lw t6, 0x2c(sp)
         sw s0, %lo(common_data+0x10020)(at)
         lui at, %hi(common_data+0x1001c)
         lw t7, 0x28(sp)
         sb t6, %lo(common_data+0x1001c)(at)
         lui at, %hi(common_data+0x1001d)
         b .L10c67
         sb t7, %lo(common_data+0x1001d)(at)
     46lw t8, %lo(common_data+0x10028)(t8)
         lui at, %hi(common_data+0x10028)
         bnezl t8, .L11068
         lw ra, 0x24(sp)
         lw t9, 0x2c(sp)
         sw s0, %lo(common_data+0x10028)(at)
         lw t0, 0x28(sp)
         lui at, %hi(common_data+0x10024)
         sb t9, %lo(common_data+0x10024)(at)
         lui at, %hi(common_data+0x10025)
         sb t0, %lo(common_data+0x10025)(at)
     28lw ra, 0x24(sp)
     58lw s0, 0x20(sp)
         addiu sp, sp, 0x38
         jr ra
         nop 
```

## `func_80973280_jp`

```c
void func_80973280_jp(Actor* actor) {
    s32 i;
    Clip_BoxTrickData* clip;
    s32 blockX;
    s32 blockZ;

    mFI_Wpos2BlockNum(&blockX, &blockZ, actor->world.pos);

    clip = common_data.clip.boxTrickData;

    for (i = 0; i < 4; i++) {
        if (clip[i].data != NULL && blockX == clip[i].blockX && blockZ == clip[i].blockZ) {
            clip[i].data = NULL;
            clip[i].blockX = -1;
            clip[i].blockZ = -1;
            return;
        }
    }
}
```

```asm
         addiu sp, sp, -0x38
         sw ra, 0x1c(sp)
         sw a0, 0x38(sp)
         lw t6, 0x38(sp)
         addiu a0, sp, 0x2c
         addiu a1, sp, 0x28
         lw t8, 0x28(t6)
         sw t8, 0x8(sp)
         lw a3, 0x2c(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x30(t6)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lui v0, %hi(common_data+0x1000c)
         lui a1, %hi(common_data+0x1002c)
         addiu a1, a1, %lo(common_data+0x1002c)
         addiu v0, v0, %lo(common_data+0x1000c)
         lw a0, 0x28(sp)
         lw v1, 0x2c(sp)
         lw t9, 0x4(v0)
     49beqzl t9, .L8c35
         lw t2, 0xc(v0)
         lbu t0, 0x0(v0)
         bnel v1, t0, .L8c35
         lw t2, 0xc(v0)
         lbu t1, 0x1(v0)
         bnel a0, t1, .L8c35
         lw t2, 0xc(v0)
         addiu v1, zero, 0xff
         sw zero, 0x4(v0)
         sb v1, 0x0(v0)
         b .Lcc51
         sb v1, 0x1(v0)
         lw t2, 0xc(v0)
     21beqzl t2, .Lc449
         addiu v0, v0, 0x10
         lbu t3, 0x8(v0)
         bnel v1, t3, .Lc449
         addiu v0, v0, 0x10
         lbu t4, 0x9(v0)
         bnel a0, t4, .Lc449
         addiu v0, v0, 0x10
         addiu v1, zero, 0xff
         sb v1, 0x8(v0)
         sb v1, 0x9(v0)
         b .Lcc51
         sw zero, 0xc(v0)
         addiu v0, v0, 0x10
     35bnel v0, a1, .L5421
         lw t9, 0x4(v0)
     32lw ra, 0x1c(sp)
         addiu sp, sp, 0x38
         jr ra
         nop 
```

## `mNpc_CheckNpcExistBlock`

```c
s32 mNpc_CheckNpcExistBlock(s32 idx, s32 checkBx, s32 checkBz) {
    UNUSED s32 pad;
    s32 bx;
    s32 bz;
    s32 res = FALSE;

    if (idx >= 0 && idx < (ANIMAL_NUM_MAX)) {
        if ((mFI_Wpos2BlockNum(&bx, &bz, common_data.npclist[idx].position) == TRUE) && (bx == checkBx) &&
            (bz == checkBz)) {
            res = TRUE;
        }
    }

    return res;
}
```

```asm
         addiu sp, sp, -0x30
         sw ra, 0x1c(sp)
         sw a0, 0x30(sp)
         sw a1, 0x34(sp)
         sw a2, 0x38(sp)
         lw t6, 0x30(sp)
         or v1, zero, zero
         bltz t6, .La842
         slti at, t6, 0xf
         beqz at, .La842
         sll t7, t6, 3
         subu t7, t7, t6
         lui at, 0x1
         ori at, at, 0x170
         sll t7, t7, 3
         lui t9, %hi(common_data)
         addiu t9, t9, %lo(common_data)
         addu t8, t7, at
         addu t0, t8, t9
         lw t2, 0x0(t0)
         addiu a0, sp, 0x28
         addiu a1, sp, 0x24
         sw t2, 0x8(sp)
         lw a3, 0x4(t0)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t2, 0x8(t0)
         sw zero, 0x20(sp)
         jal mFI_Wpos2BlockNum
         sw t2, 0x10(sp)
         addiu at, zero, 0x1
         bne v0, at, .La842
         lw v1, 0x20(sp)
         lw t3, 0x28(sp)
         lw t4, 0x34(sp)
         lw t5, 0x24(sp)
         lw t6, 0x38(sp)
         bnel t3, t4, .Lac43
         or v0, v1, zero
         bnel t5, t6, .Lac43
         or v0, v1, zero
         addiu v1, zero, 0x1
     7or  v0, v1, zero
     37lw ra, 0x1c(sp)
         addiu sp, sp, 0x30
         jr ra
         nop 
```

## `aHM1_check_inBlock`

```c
s32 aHM1_check_inBlock(Actor* thisx, xyz_t* pos, s32* blockX, s32* blockZ) {
    s32 notInBlock = FALSE;

    mFI_Wpos2BlockNum(blockX, blockZ, *pos);

    if ((thisx->blockX != *blockX) || (thisx->blockZ != *blockZ)) {
        notInBlock = TRUE;
    }

    return notInBlock;
}
```

```asm
         addiu sp, sp, -0x28
         sw ra, 0x1c(sp)
         sw a0, 0x28(sp)
         sw a1, 0x2c(sp)
         sw a2, 0x30(sp)
         sw a3, 0x34(sp)
         lw t6, 0x2c(sp)
         lw a0, 0x30(sp)
         lw a1, 0x34(sp)
         lw t8, 0x0(t6)
         sw t8, 0x8(sp)
         lw a3, 0x4(t6)
         lw a2, 0x8(sp)
         sw a3, 0xc(sp)
         lw t8, 0x8(t6)
         sw zero, 0x24(sp)
         jal mFI_Wpos2BlockNum
         sw t8, 0x10(sp)
         lw v0, 0x28(sp)
         lw t0, 0x30(sp)
         lw v1, 0x24(sp)
         lb t9, 0x8(v0)
         lw t1, 0x0(t0)
         lw t3, 0x34(sp)
         lw ra, 0x1c(sp)
         bnel t9, t1, .L8032
         addiu v1, zero, 0x1
         lb t2, 0x9(v0)
         lw t4, 0x0(t3)
         beql t2, t4, .L8433
         or v0, v1, zero
         addiu v1, zero, 0x1
     25or v0, v1, zero
     29jr ra
         addiu sp, sp, 0x28
```

## `aBALL_Random_pos_set`

```c
s32 aBALL_Random_pos_set(xyz_t* pos) {
    s32 xMax;
    s32 zMax;
    s32 utX;
    s32 utZ;
    s32 xIncrement;
    s32 zIncrement;
    s32 x;
    s32 z;
    s32 i;
    s32 j;

    xMax = mFI_GetBlockXMax();
    zMax = mFI_GetBlockZMax();
    x = RANDOM_F(xMax);
    z = RANDOM_F(zMax);

    for (i = 0; i < xMax; i++) {
        for (j = 0; j < zMax; j++) {
            if (!mFI_CheckBlockKind_OR(x, z, 0x8023) && mNpc_GetMakeUtNuminBlock_hard_area(&utX, &utZ, x, z, 2) == 1) {
                mFI_BkandUtNum2CenterWpos(pos, x, z, utX, utZ);
                return true;
            }

            zIncrement = z + 1;
            z = zMax;

            if (z == zIncrement) {
                z = 0;
            } else {
                z = zIncrement;
            }
        }

        xIncrement = x + 1;
        x = xMax;

        if (x == xIncrement) {
            x = 0;
        } else {
            x = xIncrement;
        }
    }

    return false;
}
```

```asm
         addiu sp, sp, -0x70
         sw ra, 0x44(sp)
         sw s8, 0x40(sp)
         sw s7, 0x3c(sp)
         sw s6, 0x38(sp)
         sw s5, 0x34(sp)
         sw s4, 0x30(sp)
         sw s3, 0x2c(sp)
         sw s2, 0x28(sp)
         sw s1, 0x24(sp)
         sw s0, 0x20(sp)
         sw a0, 0x70(sp)
         jal mFI_GetBlockXMax
         nop 
         jal mFI_GetBlockZMax
         or s8, v0, zero
         jal fqrand
         or s3, v0, zero
         mtc1 s8, ft0
         nop 
         cvt.s.w ft1, ft0
         mul.s ft2, fv0, ft1
         trunc.w.s ft3, ft2
         mfc1 s2, ft3
         jal fqrand
         nop 
         mtc1 s3, ft4
         or s7, zero, zero
         addiu s6, zero, 0x1
         cvt.s.w ft5, ft4
         addiu s5, sp, 0x60
         addiu s4, sp, 0x64
         mul.s ft0, fv0, ft5
         trunc.w.s ft1, ft0
         mfc1 s0, ft1
         blezl s8, .L13c79
         or v0, zero, zero
     76blez s3, .L11870
         or s1, zero, zero
         or a0, s2, zero
     68or a1, s0, zero
         jal mFI_CheckBlockKind_OR
         ori a2, zero, 0x8023
         bnez v0, .Lf862
         or a0, s4, zero
         addiu t8, zero, 0x2
         sw t8, 0x10(sp)
         or a1, s5, zero
         or a2, s2, zero
         jal mNpc_GetMakeUtNuminBlock_hard_area
         or a3, s0, zero
         bnel v0, s6, .Lfc63
         addiu v0, s0, 0x1
         lw t9, 0x60(sp)
         lw a0, 0x70(sp)
         or a1, s2, zero
         or a2, s0, zero
         lw a3, 0x64(sp)
         jal mFI_BkandUtNum2CenterWpos
         sw t9, 0x10(sp)
         b .L13c79
         addiu v0, zero, 0x1
     43addiu v0, s0, 0x1
     51bne s3, v0, .L10c67
         addiu s1, s1, 0x1
         b .L11068
         or s0, zero, zero
     63or s0, v0, zero
     65bnel s1, s3, .La040
         or a0, s2, zero
     37addiu v0, s2, 0x1
         bne s8, v0, .L12c75
         addiu s7, s7, 0x1
         b .L13076
         or s2, zero, zero
     71or s2, v0, zero
     73bne s7, s8, .L9437
         nop 
         or v0, zero, zero
     35lw ra, 0x44(sp)
         lw s0, 0x20(sp)
         lw s1, 0x24(sp)
         lw s2, 0x28(sp)
         lw s3, 0x2c(sp)
         lw s4, 0x30(sp)
         lw s5, 0x34(sp)
         lw s6, 0x38(sp)
         lw s7, 0x3c(sp)
         lw s8, 0x40(sp)
         jr ra
         addiu sp, sp, 0x70
```





# Declarations for the functions called from the target assembly

- `s32 mFI_Wpos2BlockNum(s32* blockX, s32* blockZ, xyz_t wpos);`

# Types definitions used in the declarations

```c
typedef struct xyz_t {
    /* 0x0 */ f32 x;
    /* 0x4 */ f32 y;
    /* 0x8 */ f32 z;
} xyz_t;
```

# Primary Objective

Decompile the following target assembly function from `asm/jp/nonmatchings/overlays/actors/ovl_Set_Npc_Manager/ac_set_npc_manager/func_80A242E0_jp.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
glabel func_80A242E0_jp
nonmatching func_80A242E0_jp, 0x138
    /* 8EBDA0 80A242E0 27BDFFB8 */  addiu       $sp, $sp, -0x48
    /* 8EBDA4 80A242E4 AFB00020 */  sw          $s0, 0x20($sp)
    /* 8EBDA8 80A242E8 00808025 */  or          $s0, $a0, $zero
    /* 8EBDAC 80A242EC AFBF0024 */  sw          $ra, 0x24($sp)
    /* 8EBDB0 80A242F0 AFA5004C */  sw          $a1, 0x4C($sp)
    /* 8EBDB4 80A242F4 AFA60050 */  sw          $a2, 0x50($sp)
    /* 8EBDB8 80A242F8 AFA70054 */  sw          $a3, 0x54($sp)
    /* 8EBDBC 80A242FC 27AE004C */  addiu       $t6, $sp, 0x4C
    /* 8EBDC0 80A24300 8DD80000 */  lw          $t8, 0x0($t6)
    /* 8EBDC4 80A24304 27A40044 */  addiu       $a0, $sp, 0x44
    /* 8EBDC8 80A24308 27A50040 */  addiu       $a1, $sp, 0x40
    /* 8EBDCC 80A2430C AFB80008 */  sw          $t8, 0x8($sp)
    /* 8EBDD0 80A24310 8DC70004 */  lw          $a3, 0x4($t6)
    /* 8EBDD4 80A24314 8FA60008 */  lw          $a2, 0x8($sp)
    /* 8EBDD8 80A24318 AFA7000C */  sw          $a3, 0xC($sp)
    /* 8EBDDC 80A2431C 8DD80008 */  lw          $t8, 0x8($t6)
    /* 8EBDE0 80A24320 AFA00034 */  sw          $zero, 0x34($sp)
    /* 8EBDE4 80A24324 0C0221C4 */  jal         mFI_Wpos2BlockNum
    /* 8EBDE8 80A24328 AFB80010 */   sw         $t8, 0x10($sp)
    /* 8EBDEC 80A2432C 24010001 */  addiu       $at, $zero, 0x1
    /* 8EBDF0 80A24330 14410034 */  bne         $v0, $at, .L80A24404
    /* 8EBDF4 80A24334 8FA80034 */   lw         $t0, 0x34($sp)
    /* 8EBDF8 80A24338 92020000 */  lbu         $v0, 0x0($s0)
    /* 8EBDFC 80A2433C 5440000A */  bnel        $v0, $zero, .L80A24368
    /* 8EBE00 80A24340 8FAB0044 */   lw         $t3, 0x44($sp)
    /* 8EBE04 80A24344 92190001 */  lbu         $t9, 0x1($s0)
    /* 8EBE08 80A24348 8FA90044 */  lw          $t1, 0x44($sp)
    /* 8EBE0C 80A2434C 57200006 */  bnel        $t9, $zero, .L80A24368
    /* 8EBE10 80A24350 8FAB0044 */   lw         $t3, 0x44($sp)
    /* 8EBE14 80A24354 A2090000 */  sb          $t1, 0x0($s0)
    /* 8EBE18 80A24358 8FAA0040 */  lw          $t2, 0x40($sp)
    /* 8EBE1C 80A2435C 312200FF */  andi        $v0, $t1, 0xFF
    /* 8EBE20 80A24360 A20A0001 */  sb          $t2, 0x1($s0)
    /* 8EBE24 80A24364 8FAB0044 */  lw          $t3, 0x44($sp)
  .L80A24368:
    /* 8EBE28 80A24368 8FAC0040 */  lw          $t4, 0x40($sp)
    /* 8EBE2C 80A2436C 55620026 */  bnel        $t3, $v0, .L80A24408
    /* 8EBE30 80A24370 8FBF0024 */   lw         $ra, 0x24($sp)
    /* 8EBE34 80A24374 920D0001 */  lbu         $t5, 0x1($s0)
    /* 8EBE38 80A24378 93AE005B */  lbu         $t6, 0x5B($sp)
    /* 8EBE3C 80A2437C 93AF005F */  lbu         $t7, 0x5F($sp)
    /* 8EBE40 80A24380 158D0020 */  bne         $t4, $t5, .L80A24404
    /* 8EBE44 80A24384 01CB1023 */   subu       $v0, $t6, $t3
    /* 8EBE48 80A24388 04400004 */  bltz        $v0, .L80A2439C
    /* 8EBE4C 80A2438C 01EC2023 */   subu       $a0, $t7, $t4
    /* 8EBE50 80A24390 00401825 */  or          $v1, $v0, $zero
    /* 8EBE54 80A24394 10000003 */  b           .L80A243A4
    /* 8EBE58 80A24398 AFA20038 */   sw         $v0, 0x38($sp)
  .L80A2439C:
    /* 8EBE5C 80A2439C 00021823 */  negu        $v1, $v0
    /* 8EBE60 80A243A0 AFA20038 */  sw          $v0, 0x38($sp)
  .L80A243A4:
    /* 8EBE64 80A243A4 04800004 */  bltz        $a0, .L80A243B8
    /* 8EBE68 80A243A8 00041023 */   negu       $v0, $a0
    /* 8EBE6C 80A243AC 00801025 */  or          $v0, $a0, $zero
    /* 8EBE70 80A243B0 10000002 */  b           .L80A243BC
    /* 8EBE74 80A243B4 AFA4003C */   sw         $a0, 0x3C($sp)
  .L80A243B8:
    /* 8EBE78 80A243B8 AFA4003C */  sw          $a0, 0x3C($sp)
  .L80A243BC:
    /* 8EBE7C 80A243BC 0062082A */  slt         $at, $v1, $v0
    /* 8EBE80 80A243C0 50200003 */  beql        $at, $zero, .L80A243D0
    /* 8EBE84 80A243C4 0008C080 */   sll        $t8, $t0, 2
    /* 8EBE88 80A243C8 24080001 */  addiu       $t0, $zero, 0x1
    /* 8EBE8C 80A243CC 0008C080 */  sll         $t8, $t0, 2
  .L80A243D0:
    /* 8EBE90 80A243D0 03B8C821 */  addu        $t9, $sp, $t8
    /* 8EBE94 80A243D4 8F390038 */  lw          $t9, 0x38($t9)
    /* 8EBE98 80A243D8 02081021 */  addu        $v0, $s0, $t0
    /* 8EBE9C 80A243DC 5B200007 */  blezl       $t9, .L80A243FC
    /* 8EBEA0 80A243E0 904D0000 */   lbu        $t5, 0x0($v0)
    /* 8EBEA4 80A243E4 02081021 */  addu        $v0, $s0, $t0
    /* 8EBEA8 80A243E8 90490000 */  lbu         $t1, 0x0($v0)
    /* 8EBEAC 80A243EC 252A0001 */  addiu       $t2, $t1, 0x1
    /* 8EBEB0 80A243F0 10000004 */  b           .L80A24404
    /* 8EBEB4 80A243F4 A04A0000 */   sb         $t2, 0x0($v0)
    /* 8EBEB8 80A243F8 904D0000 */  lbu         $t5, 0x0($v0)
  .L80A243FC:
    /* 8EBEBC 80A243FC 25AEFFFF */  addiu       $t6, $t5, -0x1
    /* 8EBEC0 80A24400 A04E0000 */  sb          $t6, 0x0($v0)
  .L80A24404:
    /* 8EBEC4 80A24404 8FBF0024 */  lw          $ra, 0x24($sp)
  .L80A24408:
    /* 8EBEC8 80A24408 8FB00020 */  lw          $s0, 0x20($sp)
    /* 8EBECC 80A2440C 27BD0048 */  addiu       $sp, $sp, 0x48
    /* 8EBED0 80A24410 03E00008 */  jr          $ra
    /* 8EBED4 80A24414 00000000 */   nop
endlabel func_80A242E0_jp
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
