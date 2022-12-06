#include <time.h>
#include <stdio.h>
int main()
{
	clock_t tic = clock();

    char *filename = "input.txt";
    FILE *fp = fopen(filename, "r");

    int chars[26];
    for(int i = 0; i < 26; i++) {
        chars[i] = -1;
    }

    int packet_length = 14;
    int cursor = 0;
    char ch;
    
    for(int i = 0; (ch = fgetc(fp)) != EOF; i++) {
        if(i - cursor == packet_length) {
            printf("%d\n", i);
            break;
        }
        if(chars[ch - 97] != -1) {
            int old_pos = chars[ch - 97];
            if (cursor <= old_pos) {
                cursor = old_pos + 1;
            }
        }
        chars[ch - 97] = i;
    }

    fclose(fp);

    clock_t toc = clock();

    printf("Elapsed: %f seconds\n", (double)(toc - tic) / CLOCKS_PER_SEC);

    return 0;
}