#include <ctype.h>
#include <stdio.h>

int main() {
  char string[] = "abcdefghijklmnopqrstuvwxyz";
  for (int i = 0; i < sizeof(string) / sizeof(string[0]) - 1; i++) {
    printf("%d, %d\n", (int)string[i], (int)toupper(string[i]));
  }
  return 0;
}
